import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Purchase } from 'src/app/model/purchase.model';
import { PurchaseService } from 'src/app/services/purchage.service';

@Component({
	selector: 'app-my-purchase',
	templateUrl: './my-purchase.component.html',
	styleUrls: ['./my-purchase.component.scss']
})
export class MyPurchaseComponent implements OnInit {

	routerId: string;
	purchaseList: any[] = [];
	userEmail = localStorage.getItem('currentUserEmail');
	isLoading: boolean = true; // Flag to indicate loading state

	constructor(
		private route: ActivatedRoute,
		private purchaseService: PurchaseService
	) {
		this.route.params.subscribe(params => {
			this.routerId = params['id'];
		});
	}

	ngOnInit() {
		if (this.userEmail) {
			this.purchaseService.myPurchases(this.userEmail).subscribe(
				response => {
					this.purchaseList = response['data'];
					this.isLoading = false;
				},
				error => {
					console.error('Error fetching data', error);
					this.purchaseList = [];
					this.isLoading = false;
				}
			);
		} else {
			this.isLoading = false;	
		}
	}
}
