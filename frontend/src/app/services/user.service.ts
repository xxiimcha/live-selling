import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from '../model/user.model';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    apiUrl = 'http://localhost:8000/api';
    authToken: any = null;
    authHeaders: any = null;

    constructor(private http: HttpClient) {
        this.authToken = localStorage.getItem('authToken');
        this.authHeaders = new HttpHeaders().set('Authorization', 'Bearer ' + this.authToken);
    }

    getUsers(): Observable<User[]> {
        if (this.authToken) {
            const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authToken}`);
            return this.http.get<any[]>(`${this.apiUrl}/users`, { headers }).pipe(
                catchError((error: any) => {
                    console.error('Error fetching users:', error);
                    return of([]);
                })
            );
        } else {
            console.error('Authentication token is missing');
            return of([]);
        }
    }

    saveUser(user: any): Observable<User> {
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.authToken);
        return this.http.post<any>(`${this.apiUrl}/users`, user, { headers }).pipe(
            tap ((response: any) => {
                console.log(response);
            }),
            catchError((error: any) => {
                console.error('Error saving user:', error);
                throw error; // Rethrow the error after logging
            })
        );
    }

    updateUser(user: any): Observable<User> {
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.authToken);
        return this.http.patch<any>(`${this.apiUrl}/users`, user, { headers }).pipe(
            tap((response: any) => {
                // console.log(response);
            }),
            catchError((error: any) => {
                console.error('Error saving user:', error);
                throw error; // Rethrow the error after logging
            })
        );
    }

    deleteUser(id: number): Observable<User> {
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.authToken);

        return this.http.delete<any>(`${this.apiUrl}/users/${id}`, { headers }).pipe(
            tap((response: any) => {
                // console.log(response);
            }),
            catchError((error: any) => {
                console.error('Error saving user:', error);
                throw error; // Rethrow the error after logging
            })
        );
    }

    getUserById(id: any): Observable<any> {
        if (this.authToken) {
            const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authToken}`);
            return this.http.get<any[]>(`${this.apiUrl}/customer/${id}`, { headers }).pipe(
                catchError((error: any) => {
                    console.error('Error fetching users:', error);
                    return of([]);
                })
            );
        } else {
            console.error('Authentication token is missing');
            return of([]);
        }
    }
}
