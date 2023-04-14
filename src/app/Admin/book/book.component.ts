import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BookService } from 'src/app/_services/book.service';
import { Book } from 'src/app/_models/Book';
import { BookDialogComponent } from 'src/app/book-dialog/book-dialog.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from 'src/app/_models/Category';
import { CategoryService } from 'src/app/_services/category.service';
import { Author } from 'src/app/_models/Author';
import { Router } from '@angular/router';
import { environment } from 'environments/environment.prod';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {


  categories: any[] = [];
  books!: Book[]
  // url='http://localhost:5000/uploads/books/'
  url=`${environment.url}books/`
  constructor(private bookService: BookService ,private categoryService: CategoryService,private router: Router) { }

  ngOnInit(): void {
    this.getBooks();
    this.categoryService.getCategories().subscribe(
      data => this.categories = data.data ,
      error => console.log(error)

    );
  }

  onEditClick(id: string) {
    this.router.navigate(['EditBook', id]);
  }



  getBooks(): void {
    this.bookService.getBooks(1)
      .subscribe(
        result => {
          console.log(result.data);
          this.books = result.data;
          console.log(result);

        },
        error => {
          console.error('Error getting books', error);
        }
      );
  }

  deleteBook(id: string): void {
    this.bookService.deleteBook(id)
      .subscribe(
        result => {
          console.log('Book deleted successfully', result);
          this.getBooks(); // refresh the list of books
        },
        error => {
          console.error('Error deleting book', error);
        }
      );
  }

}