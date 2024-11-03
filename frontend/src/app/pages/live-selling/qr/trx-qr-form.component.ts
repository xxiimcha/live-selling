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
        this.buildUrl = `http://192.168.254.158:4200/#/customer/purchase/confirm/${this.id}/${encodeURIComponent(this.email)}/${encodeURIComponent(this.password)}`;
        const currentURL = encodeURIComponent(this.buildUrl);
        this.currentURL = `http:/192.168.254.158:8000/api/open-in-desktop?url=${currentURL}`;
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

    _copyLink() {
        console.log(navigator.clipboard);
        navigator.clipboard.writeText(this.buildUrl);
        alert("URL copied to clipboard!");
    }

    copyLink() {
        // Create a temporary input element
        const tempInput = document.createElement('input');
        tempInput.value = this.buildUrl;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);

        alert("URL copied to clipboard!");
      }
}
