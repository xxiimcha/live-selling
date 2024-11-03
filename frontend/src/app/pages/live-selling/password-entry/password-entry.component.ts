import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EmailDataService } from 'src/app/services/email-data.service';
import { TrxService } from 'src/app/services/trx.service';

@Component({
    selector: 'app-password-entry',
    templateUrl: './password-entry.component.html',
    styleUrls: ['./password-entry.component.scss']
})
export class PasswordEntryComponent {
    email: string = '';
    password: string = '';
    errorMessage: string | null = null;
    id: string = '';

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private trxService: TrxService,
        private emailDataService: EmailDataService
    ) { 
        this.route.params.subscribe(params => {
            this.id = params['id'];
        });
        this.email = this.route.snapshot.queryParams['email'];
    }

    verifyPassword() {
        const newVal = {
            email: this.route.snapshot.queryParams['email'],
            password: this.route.snapshot.queryParams['token'],
            inputPassword: this.password
        }
        this.trxService.verifyCredentials(newVal).subscribe(res => {
            if(res?.success === "Customer Matches") {
                let credentials = {
                    email: this.route.snapshot.queryParams['email'],
            password: this.route.snapshot.queryParams['token'],
                }
                this.emailDataService.setCredentials(credentials);
                this.router.navigate([`customer/purchase/confirm/${this.id}/validated`]);
            } else {
                alert(res['error']);
            }
        });

        // const result = await response.json();
        // if (result.success) {
        //     // Password is correct, redirect to the URL
        //     window.location.href = decodeURIComponent(result.url);
        // } else {
        //     // Display error message
        //     this.errorMessage = result.message;
        // }
    }
}
