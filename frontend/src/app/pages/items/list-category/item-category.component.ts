// item.component.ts
import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/model/item.model';
import { ItemService } from 'src/app/services/item.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-item-category',
    templateUrl: './item-category.component.html',
    styleUrls: ['./item-category.component.scss']
})
export class ItemCategoryComponent implements OnInit {
    
    itemsByCategory: any[] = [];

    constructor(
        private itemService: ItemService, 
        private router: Router) { }

    ngOnInit() {
        this.loadItemsByCategory()
    }

    loadItemsByCategory() {
        this.itemService.getItemsByCategory().subscribe(response => {
            this.itemsByCategory = response;
        });
    }

    navigateToForm() {
        this.router.navigate(['admin/items/form', 0]);
    }
    
    viewItems(category: string) {
        this.router.navigate(['admin/items/list', category]);
    }
}
