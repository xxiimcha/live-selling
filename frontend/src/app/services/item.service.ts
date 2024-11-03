import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Item } from '../model/item.model';

@Injectable({
    providedIn: 'root'
})
export class ItemService {
    
    apiUrl = 'http://localhost:8000/api';
    authToken: any = null;
    authHeaders: any = null;

    constructor(private http: HttpClient) {
        this.authToken = localStorage.getItem('authToken');
        this.authHeaders = new HttpHeaders().set('Authorization', 'Bearer ' + this.authToken);
    }

    getItems(): Observable<Item[]> {
        return this.http.get<Item[]>(`${this.apiUrl}/items/all`, { headers: this.authHeaders }).pipe(
            catchError(error => {
                console.error('Error fetching items:', error);
                return of([]);
            })
        );
    }

    getItemsByCategory(): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/items`, { headers: this.authHeaders }).pipe(
            catchError(error => {
                console.error('Error fetching items:', error);
                return of([]);
            })
        );
    }

    getItemListByCategory(category: string): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/items/${category}`, { headers: this.authHeaders }).pipe(
            catchError(error => {
                console.error('Error fetching items:', error);
                return of([]);
            })
        );
    }

    saveItem(item: Item): Observable<Item> {
        return this.http.post<Item>(`${this.apiUrl}/items`, item, { headers: this.authHeaders }).pipe(
            tap((response) => {
                return response;
            }),
            catchError(error => {
                console.error('Error saving item:', error);
                throw error; // Rethrow the error after logging
            })
        );
    }

    updateItem(item: Item): Observable<Item> {
        return this.http.patch<Item>(`${this.apiUrl}/items/${item.id}`, item, { headers: this.authHeaders }).pipe(
            tap((response) => {
                return response;
            }),
            catchError(error => {
                console.error('Error updating item:', error);
                throw error;
            })
        );
    }

    deleteItem(id: number): Observable<any> {
        return this.http.delete<any>(`${this.apiUrl}/items/${id}`, { headers: this.authHeaders }).pipe(
            tap((response) => {
                return response;
            }),
            catchError(error => {
                console.error('Error deleting item:', error);
                throw error;
            })
        );
    }

    getItemById(itemId: any): Observable<Item> {
        return this.http.get<Item>(`${this.apiUrl}/item/${itemId}`, { headers: this.authHeaders }).pipe(
            tap((response) => {
                return response;
            }),
            catchError(error => {
                console.error('Error fetching item:', error);
                return of();
            })
        );
    }

    getItemsWithLessStock(): Observable<Item[]> {
        return this.http.get<Item[]>(`${this.apiUrl}/items-with-less-stock`, { headers: this.authHeaders }).pipe(
            catchError(error => {
                console.error('Error fetching items:', error);
                return of([]);
            })
        );
    }

    getItemByItemCode(item_code: any): Observable<Item> {
        return this.http.get<Item>(`${this.apiUrl}/get_item_by_item_code/${item_code}`, { headers: this.authHeaders }).pipe(
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
