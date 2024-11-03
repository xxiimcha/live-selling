// item.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Purchase } from 'src/app/model/purchase.model';
import { PurchaseService } from 'src/app/services/purchage.service';

@Component({
    selector: 'app-purchase',
    templateUrl: './purchase.component.html',
    styleUrls: ['./purchase.component.scss']
})
export class PurchaseComponent implements OnInit {
    
    purchases: Purchase[] = [];

    constructor( private purchaseService: PurchaseService, private router: Router) { }

    ngOnInit() {
        this.loadPurchases();
    }

    loadPurchases() {
        this.purchaseService.getPurchases().subscribe(response => {
            this.purchases = response['data'];
        });
    }

    navigateToForm() {
        this.router.navigate(['admin/item/form', 0]);
    }
    
    confirmOrder(id: number) {
        this.purchaseService.getPurchase(id).subscribe(purchase => {
            console.log(purchase);
            let tempPurchase = purchase['data'];
            if(tempPurchase) {
                tempPurchase.status = "Confirmed";
                this.purchaseService.updatePurchase(tempPurchase).subscribe(updatedPurchase => {
                    console.log('Purchase updated successfully:', updatedPurchase);
                    this.loadPurchases();
                }, error => {
                    console.error('Error updating purchase:', error);
                });
            }
        }, error => {
            console.error('Error fetching purchase:', error);
        });
    }    
}
