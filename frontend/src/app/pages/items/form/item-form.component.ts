import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/model/category.model';
import { Item } from 'src/app/model/item.model';
import { CategoryService } from 'src/app/services/category.service';
import { ItemService } from 'src/app/services/item.service';

@Component({
    selector: 'app-item-form',
    templateUrl: './item-form.component.html',
    styleUrls: ['./item-form.component.scss']
})
export class ItemFormComponent implements OnInit {
    item: Item = { id: null, item_name: '', item_description: '', category: '', qty: null, item_code: '', price: 0};
    categories: Category[] = [];

    routerId: string;
    categoryName: string;
    dateToday = new Date().toDateString();

    constructor(
        private categoryService: CategoryService,
        private itemService: ItemService,
        private router: Router,
        private route: ActivatedRoute
    ) {
        this.route.params.subscribe(params => {
            this.routerId = params['id'];
            this.categoryName = params['category'];
        });
    }

    ngOnInit() {
        this.loadCategories();
        if(this.routerId != '0') {
            this.itemService.getItemById(this.routerId).subscribe(
                (response) => {
                    this.item = response['data'];
                    this.dateToday = new Date(this.item.created_at).toDateString();
                },
                (error) => {
                    // handle error
                    console.error('Error retrieving category:', error);
                }
            );
        }
    }

    loadCategories() {
        this.categoryService.getCategories().subscribe(
            (response) => {
                this.categories = response['data'];
            },
            (error) => {
                console.error('Error loading categories:', error);
            }
        );
    }

    saveItem() {
        this.itemService.saveItem(this.item).subscribe(
            (response) => {
                this.router.navigate(['admin/items/list', response['data'].category]);
            },
            (error) => {
                console.error('Error saving item:', error);
            }
        );
    }

    updateItem() {
        this.itemService.updateItem(this.item).subscribe(
            (response) => {
                this.router.navigate(['admin/items/list', response['data'].category]);
            },
            (error) => {
                // handle error
                console.error('Error updating item:', error);
            }
        );
    }

    deleteItem() {
        this.itemService.deleteItem(this.item.id).subscribe(
            () => {
                console.log('Item deleted successfully');
                this.item = { id: null, item_name: '', item_description: '', category: null, qty: null, item_code: '', price: 0 };
                this.navigateBack();
            },
            (error) => {
                console.error('Error deleting item:', error);
            }
        );
    }

    navigateBack() {
        this.router.navigate(['admin/items/list', this.categoryName]);
    }
}