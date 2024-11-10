import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { CustomerLayoutComponent } from './layouts/customer-layout/customer-layout.component';
import { QrDisplayComponent } from './qr-display/qr-display.component'; // Import your new component
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'admin/dashboard',
        pathMatch: 'full',
    },
    {
        path: 'admin',
        canActivate: [AuthGuard],
        component: AdminLayoutComponent,
        children: [
            {
                path: '',
                loadChildren: () => import('src/app/layouts/admin-layout/admin-layout.module').then(m => m.AdminLayoutModule)
            }
        ]
    },
    {
        path: 'customer',
        component: CustomerLayoutComponent,
        children: [
            {
                path: '',
                loadChildren: () => import('src/app/layouts/customer-layout/customer-layout.module').then(m => m.CustomerLayoutModule)
            }
        ]
    },
    {
        path: '',
        component: AuthLayoutComponent,
        children: [
            {
                path: '',
                loadChildren: () => import('src/app/layouts/auth-layout/auth-layout.module').then(m => m.AuthLayoutModule)
            }
        ]
    },
    // Add the new route for QR display
    {
        path: 'qr-display/:id',
        component: QrDisplayComponent
    },
    {
        path: '**',
        redirectTo: 'dashboard'
    }
];

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        RouterModule.forRoot(routes, {
            useHash: true
        })
    ],
    exports: [],
})
export class AppRoutingModule { }
