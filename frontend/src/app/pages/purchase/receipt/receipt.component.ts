import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PurchaseService } from 'src/app/services/purchage.service';
@Component({
    selector: 'app-receipt',
    templateUrl: './receipt.component.html',
    styleUrls: ['./receipt.component.scss']
})
export class ReceiptComponent implements OnInit {
    routerId: number;

    purchaseDetails: any = null;

    constructor(
        private route: ActivatedRoute,
        private purchaseService: PurchaseService
    ) {
        this.route.params.subscribe(params => {
            this.routerId = params['id'];
        });
    }

    ngOnInit() {
        this.purchaseService.getPurchase(this.routerId).subscribe(
            (response) => {
                if(response) {
                    this.purchaseDetails = response['data'];
                }
            },
            (error) => {
                console.error('Error saving item:', error);
            }
        );
    }
}