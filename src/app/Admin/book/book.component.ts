import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/_services/book.service';
import { Book } from 'src/app/_models/Book';
import { CategoryService } from 'src/app/_services/category.service';
import { Router } from '@angular/router';
import { environment } from 'environments/environment.prod';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  currentPage = 1;
  isLoading: boolean = true;
  subscrbtions: Subscription[] = [];
  categories: any[] = [];
  books!: Book[]
  url = `${environment.url}books/`
  constructor(private bookService: BookService, private categoryService: CategoryService, private router: Router) { }

  ngOnInit(): void {
    this.getBooks();
    this.subscrbtions.push(this.categoryService.getCategories().subscribe(
      data => this.categories = data.data,
      error => console.log(error)
    ));
  }

  onEditClick(id: string) {
    this.router.navigate(['EditBook', id]);
  }

  getBooks(): void {
    this.subscrbtions.push(this.bookService.getBooks(1)
      .subscribe(
        result => {
          this.books = result.data;
          this.isLoading = false;
        },
        error => {
          console.error('Error getting books', error);
        }
      ));
  }

  deleteBook(id: string): void {
    this.subscrbtions.push(this.bookService.deleteBook(id)
      .subscribe(
        result => {
          this.getBooks();
        },
        error => {
          console.error('Error deleting book', error);
        }
      ));
  }

  ngOnDestroy() {
    this.subscrbtions.forEach(sub => sub.unsubscribe());
  }

}