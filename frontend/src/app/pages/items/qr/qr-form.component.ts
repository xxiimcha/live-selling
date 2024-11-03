import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
    selector: 'app-qr-form',
    templateUrl: './qr-form.component.html',
    styleUrls: ['./qr-form.component.scss']
})
export class ItemQrFormComponent implements OnInit {

    @ViewChild('qrCodeCanvas') qrCodeCanvas!: ElementRef;
    routerId: string;
    url = window.location.href;
	currentURL: string = '';

    constructor(
        private router: Router,
        private route: ActivatedRoute
    ) {
        this.route.params.subscribe(params => {
            this.routerId = params['id'];
        });
    }

    ngOnInit() {
        const buildUrl = `http://192.168.1.3:4200/#/customer/purchase/confirm/${this.routerId}`;
        const currentURL = encodeURIComponent(buildUrl);
		this.currentURL = `http://192.168.1.3:8000/api/open-in-desktop?url=${currentURL}`;
    }

    navigateBack() {
        this.router.navigate(['admin/item']);
    }

    downloadQr() {
        const canvas = this.qrCodeCanvas.nativeElement.querySelector('canvas');
		console.log(canvas)
		console.log(this.currentURL)
		const url = canvas.toDataURL('image/png');
		const a = document.createElement('a');
		a.href = url;
		a.download = 'qr-code.png';
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
    }
}