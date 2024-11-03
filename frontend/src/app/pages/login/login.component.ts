import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {

    credentials: any = { email: '', password: ''};

    constructor(
        private authService: AuthService,
        private router: Router
    ) { 
    }

    login() {
        this.authService.login(this.credentials).subscribe((res) => {
            if(res.role !== 'customer') {
                this.router.navigate(['admin/dashboard']);
            } else {
                this.router.navigate(['customer/purchase/mine']);
            }
        },
        error => {
            alert("Invalid Credentials");
        });
    }

    createNewUser() {
        this.router.navigate(['register']);
    }
}
