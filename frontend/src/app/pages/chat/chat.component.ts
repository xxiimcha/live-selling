import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { CustomerService } from 'src/app/services/customer.service';
import { Customer } from 'src/app/model/customer.model';
import { WebsocketService } from 'src/app/services/websocket.service';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
    tempCurrentUser = localStorage.getItem('currentUser');
    currentUser = Number(this.tempCurrentUser);
    customerList: Customer[] = [];
    filteredCustomerList: Customer[] = [];
    searchQuery: string = '';
    currentPage: number = 1;
    itemsPerPage: number = 10;

    messagesHistory = [];
    tempMessagesHistory = [];
    customerMessages = [];
    customerMessage: string = '';
    customerId: number = 0;
    customerName: string = '';

    selectedImage: File | null = null;

    socket = new WebSocket('ws://localhost:3000');

    constructor(
        private chatService: ChatService,
        private customerService: CustomerService
    ) { }

    ngOnInit() {
        this.loadCustomer();
        this.socket.onopen = () => {
            console.log('Connected to WebSocket server');
        };

        this.socket.onmessage = (event) => {
            let obj = JSON.parse(event.data);
            if (obj?.event === "chat-message") {
                if (obj?.data?.recipient_id == this.currentUser) {
                    this.handleIncomingMessage(obj?.data);
                }
            }
        };
    }

    handleIncomingMessage(message: any): void {
        this.messagesHistory.push(message);
    }

    loadCustomer() {
        this.customerService.getCustomers().subscribe(res => {
            this.customerList = res['data'];
            this.filteredCustomerList = [...res['data']];
            this.filterCustomer();
        });
    }

    search() {
        this.filterCustomer(); // Apply filtering
        this.currentPage = 1; // Reset currentPage when searching
    }

    filterCustomer() {
        if (this.searchQuery.trim() !== '') {
            this.customerList = this.customerList.filter(res =>
                res.last_name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                res.first_name.toLowerCase().includes(this.searchQuery.toLowerCase())
            );
            this.filteredCustomerList.sort().reverse();
        } else {
            this.filteredCustomerList = [...this.filteredCustomerList.sort().reverse()];
        }
    }

    get paginatedCustomer() {
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        return this.filteredCustomerList.slice(startIndex, startIndex + this.itemsPerPage);
    }

    totalPages() {
        const totalResidents = this.filteredCustomerList.length;
        return Math.ceil(totalResidents / this.itemsPerPage);
    }

    goToPage(page: number) {
        this.currentPage = page;
    }

    visiblePages() {
        const total = this.totalPages();
        const current = +this.currentPage;
        const delta = 2;
        let start = Math.max(1, current - delta);
        let end = Math.min(total, current + delta);

        if (end - start < 2 * delta) {
            start = Math.max(1, end - 2 * delta);
        }

        return Array.from({ length: (end - start) + 1 }, (_, i) => start + i);
    }

    openChatHistory(customer: any) {
        this.customerName = customer?.first_name + " " + customer?.last_name;
        this.customerId = customer?.id;
        this.chatService.getChatHistory(customer?.id, this.currentUser).subscribe(res => {
            // this.messagesHistory = res;
            let filteredRes = res.filter(r => r.recipient_id == this.customerId || r.recipient_id == this.currentUser);
            this.messagesHistory = [...filteredRes, ...this.tempMessagesHistory];
        });
    }

    _sendCustomerMessage() {
        let msgVal = {
            current_user: this.currentUser,
            sender_id: this.currentUser,
            recipient_id: this.customerId,
            content: this.customerMessage,
            img: this.selectedImage ? this.selectedImage : null,
            img_name: this.selectedImage ? this.selectedImage?.name : null,
            read_receipt: true
        }
        console.log(msgVal);
        this.chatService.sendMessage(msgVal).subscribe(res => {
            if (res) {
                this.socket.send(JSON.stringify({ event: 'chat-message', message: msgVal }));
                this.messagesHistory.push(msgVal);
                this.customerMessage = '';
            }
        });
    }

    sendCustomerMessage() {
        const msgVal = {
            current_user: this.currentUser,
            sender_id: this.currentUser,
            recipient_id: this.customerId,
            content: this.customerMessage,
            img: null, // Initialize img as null
            img_name: this.selectedImage ? this.selectedImage?.name : null,
            read_receipt: true
        };
    
        // Convert image file to base64 if it exists
        if (this.selectedImage) {
            const reader = new FileReader();
            reader.onload = (event: any) => {
                msgVal.img = event.target.result; // Set base64 string here
                this.sendMessageToServer(msgVal); // Call a function to send the message
            };
            reader.readAsDataURL(this.selectedImage); // Read the file as base64
        } else {
            this.sendMessageToServer(msgVal); // Send if no image
        }
    }
    
    private sendMessageToServer(msgVal: any) {
        console.log(msgVal); // Log the payload
        this.chatService.sendMessage(msgVal).subscribe(res => {
            if (res) {
                this.socket.send(JSON.stringify({ event: 'chat-message', message: msgVal }));
                this.messagesHistory.push(msgVal);
                this.customerMessage = '';
            }
        });
    }
    

    onFileSelected(event: Event) {
        const fileInput = event.target as HTMLInputElement;
        if (fileInput.files && fileInput.files.length > 0) {
            this.selectedImage = fileInput.files[0];
        }
    }
}
