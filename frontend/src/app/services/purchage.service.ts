import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Purchase } from '../model/purchase.model';

@Injectable({
    providedIn: 'root'
})
export class PurchaseService {

    private apiUrl = 'http://localhost:8000/api/purchases';

    constructor(private http: HttpClient) { }

    getPurchases(): Observable<Purchase[]> {
        return this.http.get<Purchase[]>(this.apiUrl).pipe(
            catchError(error => {
                console.error('Error fetching purchases:', error);
                return of([]);
            })
        );
    }

    getPurchase(id: number): Observable<Purchase> {
        const url = `${this.apiUrl}/${id}`;
        return this.http.get<Purchase>(url).pipe(
            catchError(error => {
                console.error(`Error fetching purchase with id=${id}:`, error);
                throw error;
            })
        );
    }

    addPurchase(purchase: any): Observable<Purchase> {
        return this.http.post<Purchase>(this.apiUrl, purchase).pipe(
            tap((response) => {
                console.log('Purchase added successfully:', response);
            }),
            catchError(error => {
                console.error('Error adding purchase:', error);
                throw error;
            })
        );
    }

    updatePurchase(purchase: Purchase): Observable<Purchase> {
        const url = `${this.apiUrl}/${purchase.id}`;
        return this.http.patch<Purchase>(url, purchase).pipe(
            tap((response) => {
                console.log('Purchase updated successfully:', response);
            }),
            catchError(error => {
                console.error(`Error updating purchase with id=${purchase.id}:`, error);
                throw error;
            })
        );
    }

    deletePurchase(id: number): Observable<any> {
        const url = `${this.apiUrl}/${id}`;
        return this.http.delete(url).pipe(
            tap(() => {
                console.log(`Purchase with id=${id} deleted successfully`);
            }),
            catchError(error => {
                console.error(`Error deleting purchase with id=${id}:`, error);
                throw error;
            })
        );
    }

    myPurchases(email: string): Observable<any> {
        return this.http.post<any[]>(`http://localhost:8000/api/my-purchases`, { email }).pipe(
            catchError((error: any) => {
                console.error('Error fetching trx:', error);
                return of([]);
            })
        );
    }

    mostBoughtItems(): Observable<any> {
        const url = `http://localhost:8000/api/most_bought_items`;
        return this.http.get<any>(url).pipe(
            catchError(error => {
                console.error(`Error fetching purchase `, error);
                throw error;
            })
        );
    }

}
