import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthLayoutRoutes } from './auth-layout.routing';

import { LoginComponent } from '../../pages/login/login.component';
import { RegisterComponent } from '../../pages/register/register.component';
import { CreateAccountComponent } from 'src/app/pages/create-account/create-account.component';
@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild(AuthLayoutRoutes),
		FormsModule
		// NgbModule
	],
	declarations: [
		LoginComponent,
		RegisterComponent,
		CreateAccountComponent
	]
})
export class AuthLayoutModule { }
