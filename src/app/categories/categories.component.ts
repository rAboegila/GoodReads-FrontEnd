import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Category } from '../_models/Category';
import { CategoryService } from '../_services/category.service';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categories: Category[] = [];
  categoryForm: FormGroup;
  showAddForm = false;
  showEditForm = false;
  categoryToEdit: any
  page: number = 1;
  pageSize: number = 10;
  collectionSize: number = 0;

  constructor(
    private categoryService: CategoryService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.categoryForm = this.formBuilder.group({
      name: ['', Validators.required]
    });

  }
  generateCategoryId(category: Category): number {
    const index = this.categories.indexOf(category);
    return index + 1;
  }


  ngOnInit(): void {
    this.getCategories();
    // this.categoryService.getCategories().subscribe(res => {
    //   this.categories = res.data;
    //   this.collectionSize = res.length;
    // });

  }

  getCategories(): void {
    this.categoryService.getCategories().subscribe(res => {
      this.categories = res.data;
      this.collectionSize = res.data;
    });
  }
  get categoriesOnPage() {
    const start = (this.page - 1) * this.pageSize;
    const end = start + this.pageSize;
    return this.categories.slice(start, end);
  }

  addCategory(): void {
    this.categoryToEdit = undefined;
    this.showAddForm = true;
  }

  editCategory(category: Category): void {
    this.categoryToEdit = category;
    this.categoryForm.patchValue({
      name: category.name
    });
    this.showEditForm = true;
    this.getCategories()
  }

  deleteCategory(category: Category): void {
    if (confirm(`Are you sure you want to delete the category "${category.name}"?`)) {
      this.categoryService.deleteCategory(category._id as string).subscribe(res => {
        const index = this.categories.indexOf(category);
        if (index > -1) {
          this.categories.splice(index, 1);
        }
        this.snackBar.open('Category deleted', 'Close', { duration: 2000 });
        this.getCategories()
      }, err => {
        this.snackBar.open('Error deleting category', 'Close', { duration: 2000 });
      });
    }
  }

  onSubmit(): void {
    const category = this.categoryForm.value as Category;
    if (this.categoryToEdit) {
      this.categoryService.updateCategory(this.categoryToEdit._id, category).subscribe(res => {
        const index = this.categories.indexOf(this.categoryToEdit);
        if (index > -1) {
          this.categories[index] = res.data;
        }
        this.snackBar.open('Category updated', 'Close', { duration: 2000 });
        this.getCategories()

      }, err => {
        this.snackBar.open('Error updating category', 'Close', { duration: 2000 });
      });
    } else {
      this.categoryService.addCategory(category).subscribe(res => {
        this.categories.push(res.data);
        this.snackBar.open('Category added', 'Close', { duration: 2000 });
        this.getCategories()

      }, err => {
        this.snackBar.open('Error adding category', 'Close', { duration: 2000 });
      });
    }
    this.cancel();
  }

  cancel(): void {
    this.categoryToEdit = undefined;
    this.showAddForm = false;
    this.showEditForm = false;
    this.categoryForm.reset();
  }
}
