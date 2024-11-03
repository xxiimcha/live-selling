import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';
import { Customer } from 'src/app/model/customer.model';

@Component({
    selector: 'app-customer',
    templateUrl: './customer.component.html',
    styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {
    
    customers: Customer[] = [];

    constructor(private customerService: CustomerService, private router: Router) { }

    ngOnInit() {
        this.loadCustomers();
    }

    loadCustomers() {
        this.customerService.getCustomers().subscribe(response => {
            this.customers = response['data'];
        });
    }

    deleteCustomer(id: number) {
        if (confirm('Are you sure you want to delete this customer?')) {
            this.customerService.deleteCustomer(id).subscribe(
                () => {
                    this.customers = this.customers.filter(customer => customer.id !== id);
                },
                (error) => {
                    console.error('Error deleting customer:', error);
                }
            );
        }
    }

    navigateToForm() {
        this.router.navigate(['admin/customer/form', 0]);
    }
    
    viewCustomer(id: string) {
        this.router.navigate(['admin/customer/form', id]);
    }    
}
