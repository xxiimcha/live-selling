import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class EmailDataService {
    private email: string | null = null;
    private password: string | null = null;

    setCredentials(data: any): void {
        this.email = data.email;
        this.password = data.password;
    }

    getCredentials(): { email: string | null, password: string | null } {
        return { email: this.email, password: this.password };
    }
}
