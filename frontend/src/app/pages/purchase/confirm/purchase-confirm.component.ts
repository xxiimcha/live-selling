import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from 'src/app/model/item.model';
import { Purchase } from 'src/app/model/purchase.model';
import { EmailDataService } from 'src/app/services/email-data.service';
import { ItemService } from 'src/app/services/item.service';
import { PurchaseService } from 'src/app/services/purchage.service';
import { TrxService } from 'src/app/services/trx.service';
@Component({
    selector: 'app-purchase-confirm',
    templateUrl: './purchase-confirm.component.html',
    styleUrls: ['./purchase-confirm.component.scss']
})
export class PurchaseConfirmComponent implements OnInit {
    routerId: string;
    url = window.location.href;
	currentURL: string = '';
    item: Item = { id: null, item_name: '', item_description: '', category: '', qty: null, item_code: '', price: 0 };
    email: string = "";
    password: string = "";
    userEmail = localStorage.getItem('currentUserEmail');
    TotalAmount: number = 0;

    constructor(
        private route: ActivatedRoute,
        private itemService: ItemService,
        private purchaseService: PurchaseService,
        private trxService: TrxService,
        private router: Router
    ) {
        this.route.params.subscribe(params => {
            this.routerId = params['id'];
            this.email = params['email'];
            this.password = params['token'];
        });
    }

    ngOnInit() {
        if(decodeURIComponent(this.email) === this.userEmail) {
            if(this.routerId) {
                this.trxService.getTrx(this.routerId).subscribe(res => {
                    const trx = res['data'];
                    if(trx) {
                        this.itemService.getItemByItemCode(trx.item_code).subscribe(
                            (response) => {
                                this.item = response['data'];
                                this.calculateTotalAmount();
                            },
                            (error) => {
                                // handle error
                                console.error('Error retrieving category:', error);
                            }
                        );
                    }
                });
            }
        } else {
            alert("Current Login User is not the one who purchased the item");
            window.close();
        }
    }

    calculateTotalAmount() {
        this.TotalAmount = this.item.price * this.item.qty;
    }

    addToOrder() {
        let purchase: any = { id: 0, item_code: this.item.item_code, ordered_by: decodeURIComponent(this.email), qty: 1, status: 'New', total_amount: this.TotalAmount, trxId: this.routerId };
        this.purchaseService.addPurchase(purchase).subscribe(
            (response) => {
                if(response['message'] === 'Item Out of Stock') {
                    alert(response['message']);
                } else {
                    this.router.navigate([`customer/purchase/receipt/${response['data']['id']}`]);
                }
            },
            (error) => {
                console.error('Error saving item:', error);
            }
        );
    }
}