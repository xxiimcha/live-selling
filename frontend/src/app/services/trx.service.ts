import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class TrxService {

    apiUrl = 'http://localhost:8000/api';
    authToken: any = null;
    authHeaders: any = null;

    constructor(private http: HttpClient) {
        this.authToken = localStorage.getItem('authToken');
        this.authHeaders = new HttpHeaders().set('Authorization', 'Bearer ' + this.authToken);
    }

    saveTrx(value: any): Observable<any> {
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.authToken);
        return this.http.post<any>(`${this.apiUrl}/mine`, value, { headers }).pipe(
            tap ((response: any) => {
                console.log(response);
            }),
            catchError((error: any) => {
                console.error('Error saving trx:', error);
                throw error; // Rethrow the error after logging
            })
        );
    }

    getTrxsByItemCode(item_code: String): Observable<any[]> {
        if (this.authToken) {
            const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authToken}`);
            return this.http.get<any[]>(`${this.apiUrl}/miner-list/${item_code}`, { headers }).pipe(
                catchError((error: any) => {
                    console.error('Error fetching trx:', error);
                    return of([]);
                })
            );
        } else {
            console.error('Authentication token is missing');
            return of([]);
        }
    }

    verifyCredentials(value: any): Observable<any> {
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.authToken);
        return this.http.post<any>(`${this.apiUrl}/verify_credentials`, value, { headers }).pipe(
            tap ((response: any) => {
                console.log(response);
            }),
            catchError((error: any) => {
                console.error('Error saving trx:', error);
                throw error; // Rethrow the error after logging
            })
        );
    }


    getHashedPassword(value: any): Observable<any> {
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.authToken);
        return this.http.post<any>(`${this.apiUrl}/get_hashed_password`, value, { headers }).pipe(
            tap ((response: any) => {
                console.log(response);
            }),
            catchError((error: any) => {
                console.error('Error saving trx:', error);
                throw error; // Rethrow the error after logging
            })
        );
    }

    getTrx(id: String): Observable<any> {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authToken}`);
        return this.http.get<any[]>(`${this.apiUrl}/live_selling_trx/${id}`, { headers }).pipe(
            catchError((error: any) => {
                console.error('Error fetching trx:', error);
                return of([]);
            })
        );
    }
}
