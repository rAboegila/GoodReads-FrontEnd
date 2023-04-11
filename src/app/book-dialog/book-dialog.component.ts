import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from '../_models/Category';
import { Author } from '../_models/Author';
import { BookService } from '../_services/book.service';
import { CategoryService } from '../_services/category.service';
import { Book } from '../_models/Book';
import { AuthorService } from '../_services/author.service';
@Component({
  selector: 'app-book-dialog',
  templateUrl: './book-dialog.component.html',
  styleUrls: ['./book-dialog.component.css']
})
export class BookDialogComponent {
  // bookForm: FormGroup;
  // categories: Category[];
  // authors: Author[];

  // constructor(
  //   public dialogRef: MatDialogRef<BookDialogComponent>,
  //   @Inject(MAT_DIALOG_DATA) public data: { book: Book },
  //   private fb: FormBuilder,
  //   private bookService: BookService,
  //   private categoryService: CategoryService,
  //   private authorService: AuthorService
  // ) {}

  // ngOnInit() {
  //   this.bookForm = this.fb.group({
  //     name: ['', Validators.required],
  //     category: ['', Validators.required],
  //     author: ['', Validators.required],
  //     image: [''],
  //     avgRating: [''],
  //     reviews: ['']
  //   });
  //   this.categoryService.getCategories().subscribe(categories => this.categories = categories);
  //   this.authorService.getAuthors().subscribe(authors => this.authors = authors);
  //   if (this.data.book) {
  //     this.bookForm.patchValue(this.data.book);
  //   }
  // }
}
