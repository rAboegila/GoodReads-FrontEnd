import { Component, OnInit } from '@angular/core';
import { environment } from 'environments/environment.prod';
import { Subscription } from 'rxjs';
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
currentPage = 1;
searchTerm: string ='';
// url='http://localhost:5000/uploads/books/'
url=`${environment.url}books/`
private subscription!: Subscription;

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.subscription = this.bookService.getBooks(1).subscribe(data => {
      this.books = data.data;
    });
  }

  clearSearchTerm() {
    this.searchTerm = '';
  }
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
