import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from 'src/app/model/customer.model';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
    selector: 'app-create-account',
    templateUrl: './create-account.component.html',
    styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {
    customer: Customer = { id: null, email: '', password: '', first_name: '', last_name: '', middle_name: '', zipcode: '', address: '' };

    routerId: string;

    constructor(
        private customerService: CustomerService,
        private router: Router,
        private route: ActivatedRoute
    ) {
        this.route.params.subscribe(params => {
            this.routerId = params['id'];
        });
    }

    ngOnInit() {
        if(this.routerId) {
            this.customerService.getCustomerById(this.routerId).subscribe(
                (response) => {
                    this.customer = response['data'];
                },
                (error) => {
                    // handle error
                    console.error('Error retrieving customer:', error);
                }
            );
        }
    }

    saveCustomer() {
        this.customerService.saveNewCustomer(this.customer).subscribe(
            (response) => {
                // handle success
                console.log('Customer saved successfully:', response);
                this.navigateBack();
            },
            (error) => {
                // handle error
                console.error('Error saving customer:', error);
            }
        );
    }

    navigateBack() {
        // Navigate back to the customer list
        this.router.navigate(['login']);
    }
}
