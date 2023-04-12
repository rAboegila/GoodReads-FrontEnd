import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/_models/Book';
import { BookService } from 'src/app/_services/book.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  books: Book[] = [];
hover: any;

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.bookService.getBooks(1).subscribe(data => {
      this.books = data.books;
    });
  }

}
