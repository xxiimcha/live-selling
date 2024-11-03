import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Category } from '../model/category.model';

@Injectable({
    providedIn: 'root'
})
export class CategoryService {

    apiUrl = 'http://localhost:8000/api';
    authToken: any = null;
    authHeaders: any = null;

    constructor(private http: HttpClient) {
        this.authToken = localStorage.getItem('authToken');
        this.authHeaders = new HttpHeaders().set('Authorization', 'Bearer ' + this.authToken);
    }

    getCategories(): Observable<Category[]> {
        return this.http.get<Category[]>(`${this.apiUrl}/categories`, { headers: this.authHeaders }).pipe(
            catchError(error => {
                console.error('Error fetching categories:', error);
                return of([]);
            })
        );
    }

    saveCategory(category: Category): Observable<Category> {
        return this.http.post<Category>(`${this.apiUrl}/categories`, category, { headers: this.authHeaders }).pipe(
            tap((response) => {
                return response;
            }),
            catchError(error => {
                console.error('Error saving category:', error);
                throw error; // Rethrow the error after logging
            })
        );
    }

    updateCategory(category: Category): Observable<Category> {
        return this.http.patch<Category>(`${this.apiUrl}/categories/${category.id}`, category, { headers: this.authHeaders }).pipe(
            tap((response) => {
                return response;
            }),
            catchError(error => {
                console.error('Error updating category:', error);
                throw error;
            })
        );
    }

    deleteCategory(id: number): Observable<any> {
        return this.http.delete<any>(`${this.apiUrl}/categories/${id}`, { headers: this.authHeaders }).pipe(
            tap((response) => {
                return response;
            }),
            catchError(error => {
                console.error('Error deleting category:', error);
                throw error;
            })
        );
    }

    getCategoryById(id: any): Observable<Category> {
        return this.http.get<Category>(`${this.apiUrl}/categories/${id}`, { headers: this.authHeaders }).pipe(
            tap((response) => {
                return response;
            }),
            catchError(error => {
                console.error('Error fetching category:', error);
                return of();
            })
        );
    }
}
