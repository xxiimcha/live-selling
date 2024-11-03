import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/model/category.model';
import { CategoryService } from 'src/app/services/category.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-sub-category',
    templateUrl: './sub-category.component.html',
    styleUrls: ['./sub-category.component.scss']
})
export class SubCategoryComponent implements OnInit {
    
    sub_categories: any[] = [];

    constructor(private categoryService: CategoryService, private router: Router) { }

    ngOnInit() {
        this.loadCategories();
    }

    loadCategories() {
        this.categoryService.getCategories().subscribe(response => {
            this.sub_categories = response['data'];
            const items = response['data'];
            let categories = items.reduce((acc, item) => {
                const category = item.sizes;

                if (!acc[category]) {
                    acc[category] = [];
                }
                acc[category].push(item);
                return acc;
            }, {});

            this.sub_categories = Object.keys(categories).map(key => ({
                category_name: key,
                items: categories[key]
            }));
        });
    }

    deleteCategory(id: number) {
        if (confirm('Are you sure you want to delete this category?')) {
            this.categoryService.deleteCategory(id).subscribe(
                () => {
                    this.sub_categories = this.sub_categories.filter(category => category.id !== id);
                },
                (error) => {
                    console.error('Error deleting category:', error);
                }
            );
        }
    }

    navigateToForm() {
        this.router.navigate(['admin/category/form', 0]);
    }
    
    viewCategory(id: string) {
        this.router.navigate(['admin/category/form', id]);
    }    
}
