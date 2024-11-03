import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from 'src/app/model/customer.model';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
    selector: 'app-customer-form',
    templateUrl: './customer-form.component.html',
    styleUrls: ['./customer-form.component.scss']
})
export class CustomerFormComponent implements OnInit {
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
        this.customerService.saveCustomer(this.customer).subscribe(
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

    updateCustomer() {
        this.customerService.updateCustomer(this.customer).subscribe(
            (response) => {
                // handle success
                console.log('Customer updated successfully:', response);
                this.navigateBack();
            },
            (error) => {
                // handle error
                console.error('Error updating customer:', error);
            }
        );
    }

    deleteCustomer() {
        this.customerService.deleteCustomer(this.customer.id).subscribe(
            () => {
                // handle success
                console.log('Customer deleted successfully');
                // Optionally reset the form
                this.customer = { id: null, email: '', password: '', first_name: '', last_name: '', middle_name: '', zipcode: '', address: '' };
                this.navigateBack();
            },
            (error) => {
                // handle error
                console.error('Error deleting customer:', error);
            }
        );
    }

    navigateBack() {
        // Navigate back to the customer list
        this.router.navigate(['admin/customer']);
    }
}
