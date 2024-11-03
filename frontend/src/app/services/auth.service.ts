import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    apiUrl = 'http://localhost:8000/api';
    private authTokenKey = 'authToken';
    private userRoleKey = 'userRole';
    private currentUserKey = 'currentUser';
    private currentUserEmailKey = 'currentUserEmail';

    constructor(private http: HttpClient) { }

    login(credentials: any): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/login`, credentials).pipe(
            tap((response) => {
                if (response.token) {
                    localStorage.setItem(this.authTokenKey, response.token);
                    if (response.role) {
                        localStorage.setItem(this.userRoleKey, response.role);
                        localStorage.setItem(this.currentUserKey, response.currentUser);
                        localStorage.setItem(this.currentUserEmailKey, response.email)
                    }
                }
            })
        );
    }

    logout(): Observable<any> {
        const authToken = localStorage.getItem(this.authTokenKey);
        if (!authToken) {
            return of(null);
        }

        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + authToken);
        return this.http.post<any>(`${this.apiUrl}/logout`, null, { headers }).pipe(
            tap(() => {
                localStorage.removeItem(this.authTokenKey);
                localStorage.removeItem(this.userRoleKey); 
                localStorage.removeItem(this.currentUserKey); 
                localStorage.removeItem(this.currentUserEmailKey); 
            }),
            catchError((error) => {
                // Handle logout error
                console.error('Logout failed:', error);
                return of(null);
            })
        );
    }

    isLoggedIn(): Observable<boolean> {
        const authToken = localStorage.getItem(this.authTokenKey);
        return authToken != null ? of(true) : of(false);
    }

    getUserRole(): Observable<string | null> {
        return of(localStorage.getItem(this.userRoleKey));
    }
}
