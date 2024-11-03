import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; 
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ClipboardModule } from 'ngx-clipboard';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomerLayoutRoutes } from './customer-layout.routing';
import { PurchaseConfirmComponent } from 'src/app/pages/purchase/confirm/purchase-confirm.component';
import { MineFunctionComponent } from 'src/app/pages/purchase/mine-function/mine-function.component';
import { PasswordEntryComponent } from 'src/app/pages/live-selling/password-entry/password-entry.component';
import { ReceiptComponent } from 'src/app/pages/purchase/receipt/receipt.component';

@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild(CustomerLayoutRoutes),
		FormsModule,
		HttpClientModule,
		NgbModule,
		ClipboardModule
	],
	declarations: [
		PurchaseConfirmComponent,
		MineFunctionComponent,
		PasswordEntryComponent,
		ReceiptComponent
	]
})

export class CustomerLayoutModule { }
