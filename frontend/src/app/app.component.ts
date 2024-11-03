import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { WebsocketService } from './services/websocket.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

	userRole = localStorage.getItem('userRole');
	currentUser = localStorage.getItem('currentUser');
	isAdminLoggedIn: boolean = false;
	isCustomerLoggedIn: boolean = false;

	constructor(
		public authService: AuthService,
		private websocketService: WebsocketService
	) { }

	ngOnInit(): void {
		this.authService.isLoggedIn().subscribe(res => {
			if (this.userRole === "customer") {
				this.isCustomerLoggedIn = res;
			}
		});

		this.websocketService.messages.subscribe(message => {
			if (message?.event === "open-in-desktop") {
				window.open(message?.message, '_blank');
			}
		});
	}
}
