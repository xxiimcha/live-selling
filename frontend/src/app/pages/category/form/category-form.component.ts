import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/model/category.model';
import { CategoryService } from 'src/app/services/category.service';

@Component({
    selector: 'app-category-form',
    templateUrl: './category-form.component.html',
    styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {
    category: Category = { id: null, category_name: '', supplier_name: '', sizes: '' };

    sizesList: any[] = [
        'Extra Small (XS)',
        'Small (S)',
        'Medium (M)',
        'Large (L)',
        'Extra Large (XL)',
        'Double Extra Large (XXL)'
    ];

    routerId: string;

    constructor(
        private categoryService: CategoryService,
        private router: Router,
        private route: ActivatedRoute
    ) {
        this.route.params.subscribe(params => {
            this.routerId = params['id'];
        });
    }

    ngOnInit() {
        if(this.routerId !== '0') {
            this.categoryService.getCategoryById(this.routerId).subscribe(
                (response) => {
                    this.category = response['data'];
                },
                (error) => {
                    // handle error
                    console.error('Error retrieving category:', error);
                }
            );
        }
    }

    saveCategory() {
        this.categoryService.saveCategory(this.category).subscribe(
            (response) => {
                // handle success
                console.log('Category saved successfully:', response);
                this.navigateBack();
            },
            (error) => {
                // handle error
                console.error('Error saving category:', error);
            }
        );
    }

    updateCategory() {
        this.categoryService.updateCategory(this.category).subscribe(
            (response) => {
                // handle success
                console.log('Category updated successfully:', response);
                this.navigateBack();
            },
            (error) => {
                // handle error
                console.error('Error updating category:', error);
            }
        );
    }

    deleteCategory() {
        this.categoryService.deleteCategory(this.category.id).subscribe(
            () => {
                // handle success
                console.log('Category deleted successfully');
                // Optionally reset the form
                this.category = { id: null, category_name: '', supplier_name: '', sizes: '' };
                this.navigateBack();
            },
            (error) => {
                // handle error
                console.error('Error deleting category:', error);
            }
        );
    }

    navigateBack() {
        // Navigate back to the category list
        this.router.navigate(['admin/category']);
    }
}
