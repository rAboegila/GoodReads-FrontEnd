import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BookService } from 'src/app/_services/book.service';
import { Book } from 'src/app/_models/Book';
import { BookDialogComponent } from 'src/app/book-dialog/book-dialog.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from 'src/app/_models/Category';
import { Author } from 'src/app/_models/Author';
@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  books!: Book[]
  url='http://localhost:5000/uploads/books/'
  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.getBooks();
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