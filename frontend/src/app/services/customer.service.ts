import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Customer } from '../model/customer.model';

@Injectable({
    providedIn: 'root'
})
export class CustomerService {
    
    apiUrl = 'http://localhost:8000/api';
    authToken: any = null;
    authHeaders: any = null;

    constructor(private http: HttpClient) {
        this.authToken = localStorage.getItem('authToken');
        this.authHeaders = new HttpHeaders().set('Authorization', 'Bearer ' + this.authToken);
    }

    getCustomers(): Observable<Customer[]> {
        return this.http.get<Customer[]>(`${this.apiUrl}/customers`, { headers: this.authHeaders }).pipe(
            catchError(error => {
                console.error('Error fetching customers:', error);
                return of([]);
            })
        );
    }

    saveCustomer(item: Customer): Observable<Customer> {
        return this.http.post<Customer>(`${this.apiUrl}/customers`, item, { headers: this.authHeaders }).pipe(
            tap((response) => {
                return response;
            }),
            catchError(error => {
                console.error('Error saving item:', error);
                throw error; // Rethrow the error after logging
            })
        );
    }

    saveNewCustomer(item: Customer): Observable<Customer> {
        return this.http.post<Customer>(`${this.apiUrl}/new-customer`, item).pipe(
            tap((response) => {
                return response;
            }),
            catchError(error => {
                console.error('Error saving item:', error);
                throw error; // Rethrow the error after logging
            })
        );
    }

    updateCustomer(item: Customer): Observable<Customer> {
        return this.http.patch<Customer>(`${this.apiUrl}/customers/${item.id}`, item, { headers: this.authHeaders }).pipe(
            tap((response) => {
                return response;
            }),
            catchError(error => {
                console.error('Error updating item:', error);
                throw error;
            })
        );
    }

    deleteCustomer(id: number): Observable<any> {
        return this.http.delete<any>(`${this.apiUrl}/customers/${id}`, { headers: this.authHeaders }).pipe(
            tap((response) => {
                return response;
            }),
            catchError(error => {
                console.error('Error deleting item:', error);
                throw error;
            })
        );
    }

    getCustomerById(id: any): Observable<Customer> {
        return this.http.get<Customer>(`${this.apiUrl}/customers/${id}`, { headers: this.authHeaders }).pipe(
            tap((response) => {
                return response;
            }),
            catchError(error => {
                console.error('Error fetching item:', error);
                return of();
            })
        );
    }
}
