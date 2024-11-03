import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TrxService } from 'src/app/services/trx.service';
@Component({
    selector: 'app-mine-function',
    templateUrl: './mine-function.component.html',
    styleUrls: ['./mine-function.component.scss']
})
export class MineFunctionComponent implements OnInit {
    routerId: string;

    itemOnSale: any = { item_code: "", description: "" };

    constructor(
        private route: ActivatedRoute,
        private trxService: TrxService
    ) {
        this.route.params.subscribe(params => {
            this.routerId = params['id'];
        });
    }

    ngOnInit() {
        const socket = new WebSocket('ws://localhost:3000');
        socket.onopen = () => {
            console.log('Connected to WebSocket server');
        };

        socket.onmessage = (event) => {
            let obj = JSON.parse(event.data);
            if(obj?.event === "customer-next-item") {
                this.itemOnSale = obj?.message;
            }
        };
    }

    customerMine(value: any) {
        const newVal = {
            val: value,
            status: 'Mine'
        }
        this.trxService.saveTrx(newVal).subscribe(
            (response) => {
                console.log(response);
            },
            (error) => {
                console.error('Error saving item:', error);
            }
        );
    }
}