import { Injectable } from '@angular/core';
import { catchError, Observable, of, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ChatService {
    apiUrl = 'http://localhost:8000/api';
    authToken: any = null;
    authHeaders: any = null;

    constructor(private http: HttpClient) {
        this.authToken = localStorage.getItem('authToken');
        this.authHeaders = new HttpHeaders().set('Authorization', 'Bearer ' + this.authToken);
    }

    sendMessage(message: any) {
        return this.http.post<any[]>(`${this.apiUrl}/save-chat`, message, { headers: this.authHeaders }).pipe(
            catchError(error => {
                console.error('Error fetching categories:', error);
                return of([]);
            })
        );
    }

    onMessageReceived() {
    }

    getChatHistory(userId: number, ownerId: number): Observable<any[]> {
        return this.http.post<any[]>(`${this.apiUrl}/chat-history`, { chat: { userId: userId, ownerId:ownerId }}, { headers: this.authHeaders }).pipe(
            catchError(error => {
                console.error('Error fetching categories:', error);
                return of([]);
            })
        );
    }
}
