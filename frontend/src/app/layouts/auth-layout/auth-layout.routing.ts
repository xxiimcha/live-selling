import { Routes } from '@angular/router';

import { LoginComponent } from '../../pages/login/login.component';
import { CreateAccountComponent } from 'src/app/pages/create-account/create-account.component';

export const AuthLayoutRoutes: Routes = [
    { path: 'login',          component: LoginComponent },
    { path: 'register',       component: CreateAccountComponent },
];
