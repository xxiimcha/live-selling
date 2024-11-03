import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmailDataService } from 'src/app/services/email-data.service';
import { TrxService } from 'src/app/services/trx.service';

@Component({
	selector: 'app-miner-list',
	templateUrl: './miner-list.component.html',
	styleUrls: ['./miner-list.component.scss']
})
export class MinerListComponent implements OnInit {

	code: string;
	minerList: any[] = [];

	socket = new WebSocket('ws://localhost:3000');


	constructor(
		private route: ActivatedRoute,
		private trxService: TrxService,
		private router: Router,
		private emailDataService: EmailDataService
	) {
		this.route.params.subscribe(params => {
			this.code = params['code'];
		});
	}

	ngOnInit() {
		this.trxService.getTrxsByItemCode(this.code).subscribe(
			response => {
				this.minerList = response || [];
			},
			error => {
				console.error('Error fetching data', error);
				this.minerList = [];
			}
		);
	}

	
    generateQrCode(item: any) {
		this.router.navigate([`admin/live-selling/miner-list/${this.code}/qr/${item.id}/${encodeURIComponent(item.ordered_by)}/${encodeURIComponent(item.password)}`]);
    }
}
