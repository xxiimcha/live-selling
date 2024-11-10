import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-qr-display',
  templateUrl: './qr-display.component.html',
  styleUrls: ['./qr-display.component.scss']
})
export class QrDisplayComponent implements OnInit {
  qrCodeUrl: string = '';

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    // Get the `id` parameter from the route
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      // Build the URL for the QR code based on the id
      this.qrCodeUrl = `http://localhost:4200/#/customer/purchase/confirm/${id}`;
    }
  }
}
