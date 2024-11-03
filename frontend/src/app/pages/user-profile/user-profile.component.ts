import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/model/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
	selector: 'app-user-profile',
	templateUrl: './user-profile.component.html',
	styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

	routerId: string;
	user_profile: User = { id: null, first_name: '', last_name: '', email: '', contact_number: '', password: '', address: '', zipcode: ''};
	
	editProfile: boolean = false;

	constructor(
		private route: ActivatedRoute,
		private userService: UserService
	) { 
		this.route.params.subscribe(params => {
            this.routerId = params['id'];
        });
	}

	ngOnInit() {
		this.getCurrentLoggedInUser();
	}

	getCurrentLoggedInUser() {
		this.userService.getUserById(this.routerId).subscribe(user => {
			this.user_profile = user['data'];
		});
	}

	saveProfile() {
		this.editProfile = false;
		this.userService.updateUser(this.user_profile).subscribe(() => {
		});
	}
}
