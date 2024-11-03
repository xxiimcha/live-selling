import { Routes } from '@angular/router';
import { PasswordEntryComponent } from 'src/app/pages/live-selling/password-entry/password-entry.component';
import { MyPurchaseComponent } from 'src/app/pages/my-purchase/my-purchase.component';
import { PurchaseConfirmComponent } from 'src/app/pages/purchase/confirm/purchase-confirm.component';
import { MineFunctionComponent } from 'src/app/pages/purchase/mine-function/mine-function.component';
import { ReceiptComponent } from 'src/app/pages/purchase/receipt/receipt.component';
import { UserProfileComponent } from 'src/app/pages/user-profile/user-profile.component';

export const CustomerLayoutRoutes: Routes = [
    { path: 'purchase/mine', component: MineFunctionComponent },
    { path: 'purchase/confirm/:id/:email/:token', component: PurchaseConfirmComponent },
    { path: 'purchase/receipt/:id', component: ReceiptComponent },
    // { path: 'purchase/confirm/:id/validated', component: PurchaseConfirmComponent },
    { path: 'my-purchases', component: MyPurchaseComponent },
    { path: 'profile/form/:id', component: UserProfileComponent }
];
