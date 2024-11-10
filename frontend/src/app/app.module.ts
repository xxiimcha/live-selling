import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { QrCodeModule } from 'ng-qrcode';
import { CustomerLayoutComponent } from './layouts/customer-layout/customer-layout.component';
import { ChatModule } from './chat/chat.module';
import { QrDisplayComponent } from './qr-display/qr-display.component';
import { NgxQRCodeModule } from 'ngx-qrcode2';

@NgModule({
	imports: [
		BrowserAnimationsModule,
		FormsModule,
		HttpClientModule,
		ComponentsModule,
		NgbModule,
		RouterModule,
		AppRoutingModule,
		QrCodeModule,
		ChatModule,
    NgxQRCodeModule
	],
	declarations: [
		AppComponent,
		AdminLayoutComponent,
		AuthLayoutComponent,
		CustomerLayoutComponent,
  QrDisplayComponent
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
