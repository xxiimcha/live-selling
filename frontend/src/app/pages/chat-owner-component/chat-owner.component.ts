import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';

@Component({
    selector: 'app-chat-owner',
    templateUrl: './chat-owner.component.html',
    styleUrls: ['./chat-owner.component.scss']
})
export class ChatOwnerComponent implements OnInit {
    socket = new WebSocket('ws://localhost:3000');
    isVisible = false;
    tempCurrentUser = localStorage.getItem('currentUser');
    currentUser = Number(this.tempCurrentUser);
    
    messagesHistory = [];
    customerMessages = [];
    customerMessage: string = '';
    customerId: number = 0;
    customerName: string = '';

    unreadMessagesCount = 0;
    selectedImage: File | null = null;

    constructor(
        private chatService: ChatService
    ) {
    }

    ngOnInit() {
        this.socket.onopen = () => {
            console.log('Connected to WebSocket server');
        };

        this.socket.onmessage = (event) => {
            let obj = JSON.parse(event.data);
            // console.log('Received message from server:', obj);
            if(obj?.event === "chat-message") {
                if(obj?.data?.recipient_id == this.currentUser) {
                    this.handleIncomingMessage(obj?.data);
                }
            }
        };
        this.loadChatHistory();
    }

    handleIncomingMessage(message: any): void {
        this.messagesHistory.push(message);
        if (!this.isVisible) {
            this.unreadMessagesCount++;
        }
    }

    loadChatHistory() {
        this.chatService.getChatHistory(this.currentUser, null).subscribe(res => {
            this.messagesHistory = res;
        });
    }

    toggleChat() {
        this.isVisible = !this.isVisible;
        this.unreadMessagesCount = 0;
    }

    _sendOwnerMessage() {
        let msgVal = {
            current_user: this.currentUser,
            sender_id: this.currentUser,
            recipient_id: 1,
            content: this.customerMessage,
            read_receipt: true
		}
        this.chatService.sendMessage(msgVal).subscribe(res => {
            if(res) {
                this.socket.send(JSON.stringify({ event: 'chat-message', message: msgVal }));
                this.messagesHistory.push(msgVal);
                this.customerMessage = '';
            }
        });
    }

    sendOwnerMessage() {
        const msgVal = {
            current_user: this.currentUser,
            sender_id: this.currentUser,
            recipient_id: 1,
            content: this.customerMessage,
            img: null,
            img_name: this.selectedImage ? this.selectedImage?.name : null
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
