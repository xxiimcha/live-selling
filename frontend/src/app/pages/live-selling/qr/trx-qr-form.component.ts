import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmailDataService } from 'src/app/services/email-data.service';

@Component({
    selector: 'app-trx-qr-form',
    templateUrl: './trx-qr-form.component.html',
    styleUrls: ['./trx-qr-form.component.scss']
})
export class TrxQrFormComponent implements OnInit {

    @ViewChild('qrCodeCanvas') qrCodeCanvas!: ElementRef;
    code: string;
    currentURL: string = '';
    id: string = '';
    email: string = "";
    password: string = "";
    buildUrl: string = '';
    qrDisplayUrl: string = '';

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private emailDataService: EmailDataService
    ) {
        this.route.params.subscribe(params => {
            this.code = params['code'];
            this.id = params['id'];
            this.email = params['email'];
            this.password = params['token'];
        });
    }

    ngOnInit() {
        this.buildUrl = `http://localhost:4200/#/customer/purchase/confirm/${this.id}/${encodeURIComponent(this.email)}/${encodeURIComponent(this.password)}`;

        const encodedURL = encodeURIComponent(this.buildUrl);
        this.currentURL = `http://192.168.254.158:4200/api/open-in-desktop?url=${encodedURL}`;

        // Set the URL for the QR display page
        this.qrDisplayUrl = `http://localhost:4200/#/qr-display/${this.id}`;
    }

    navigateBack() {
        this.router.navigate([`admin/live-selling/miner-list/${this.code}`]);
    }

    downloadQr() {
        const canvas = this.qrCodeCanvas.nativeElement.querySelector('canvas');
        const url = canvas.toDataURL('image/png');
        const a = document.createElement('a');
        a.href = url;
        a.download = 'qr-code.png';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

    copyLink() {
        navigator.clipboard.writeText(this.qrDisplayUrl);
        alert("QR Code page URL copied to clipboard!");
    }
}
