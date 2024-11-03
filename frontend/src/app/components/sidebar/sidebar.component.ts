import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare interface RouteInfo {
	path: string;
	title: string;
	icon: string;
	class: string;
}
export const ADMIN_ROUTES: RouteInfo[] = [
	{ path: 'dashboard', title: 'Dashboard', icon: 'ni-tv-2 text-primary', class: '' },
	// { path: '/icons', title: 'Items', icon: 'ni-planet text-blue', class: '' },
	// { path: '/maps', title: 'Maps', icon: 'ni-pin-3 text-orange', class: '' },
	{ path: 'live-selling', title: 'Live Selling', icon: 'ni-cart text-orange', class: '' },
	{ path: 'purchase', title: 'Purchases', icon: 'ni-cart text-orange', class: '' },
	{ path: 'item-by-category', title: 'Items', icon: 'ni-bullet-list-67 text-red', class: '' },
	{ path: 'category', title: 'Category', icon: 'ni-pin-3 text-yellow', class: '' },
	{ path: 'customer', title: 'Customer', icon: 'ni-single-02 text-blue', class: '' },
	{ path: 'chat', title: 'Chat', icon: 'ni-chat-round', class: '' },
	// { path: '/register', title: 'Register', icon: 'ni-circle-08 text-pink', class: '' }
];

export const CUSTOMER_ROUTES: RouteInfo[] = [
	{ path: 'purchase/mine', title: 'Live Selling', icon: 'ni-single-02 text-blue', class: '' },
	{ path: 'my-purchases', title: 'My Purchase', icon: 'ni-cart text-orange', class: '' }
];

@Component({
	selector: 'app-sidebar',
	templateUrl: './sidebar.component.html',
	styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

	public menuItems: any[];
	public isCollapsed = true;

	isAdmin: boolean = false;

	constructor(private router: Router) { 
		const isAdminUrl = window.location.href;
		if(isAdminUrl.includes('admin')) {
			this.isAdmin = true;
		}
	}

	ngOnInit() {
		let ROUTES = this.isAdmin ? ADMIN_ROUTES : CUSTOMER_ROUTES;
		this.menuItems = ROUTES.filter(menuItem => menuItem);
		this.router.events.subscribe((event) => {
			this.isCollapsed = true;
		});
	}
}
