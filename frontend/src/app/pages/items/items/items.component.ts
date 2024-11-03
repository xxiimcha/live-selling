// item.component.ts
import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/model/item.model';
import { ItemService } from 'src/app/services/item.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-items',
    templateUrl: './items.component.html',
    styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {
    
    items: Item[] = [];

    categoryName: string;

    constructor(
        private itemService: ItemService, 
        private router: Router,
        private route: ActivatedRoute
    ) {
        this.route.params.subscribe(params => {
            this.categoryName = params['category'];
        });
    }

    ngOnInit() {
        if(this.categoryName !== '') {
            this.loadItems();
        }
    }

    loadItems() {
        this.itemService.getItemListByCategory(this.categoryName).subscribe(response => {
            this.items = response['data'];
        });
    }

    deleteItem(id: number) {
        if (confirm('Are you sure you want to delete this item?')) {
            this.itemService.deleteItem(id).subscribe(
                () => {
                    this.items = this.items.filter(item => item.id !== id);
                },
                (error) => {
                    console.error('Error deleting item:', error);
                }
            );
        }
    }

    navigateToForm() {
        this.router.navigate(['admin/items/form', this.categoryName, 0]);
    }
    
    viewItem(id: number) {
        this.router.navigate(['admin/items/form', this.categoryName, id]);
    }
    
    generateQrCode(id: number) {
        this.router.navigate(['admin/items/qr', this.categoryName, id]);
    }
}
