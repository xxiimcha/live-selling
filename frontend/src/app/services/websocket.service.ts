import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class WebsocketService {
    private socket: WebSocket;
    private messagesSubject = new Subject<any>();

    constructor() {
        this.connect();
    }

    private connect() {
        this.socket = new WebSocket('ws://localhost:3000');

        this.socket.onopen = () => {
            console.log('Connected to WebSocket server');
        };

        this.socket.onmessage = (event) => {
            // Check if the message is a string
            if (typeof event.data === 'string') {
                try {
                    const message = JSON.parse(event.data);
                    this.messagesSubject.next(message);
                } catch (error) {
                    console.error('Error parsing message:', error);
                }
            } else {
                console.error('Received non-string message:', event.data);
            }
        };

        this.socket.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        this.socket.onclose = () => {
            console.log('WebSocket connection closed');
        };
    }

    sendMessage(event: string, message: any) {
        this.socket.send(JSON.stringify({ event, message }));
    }

    get messages() {
        return this.messagesSubject.asObservable();
    }
}
