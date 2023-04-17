import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Author } from 'src/app/_models/Author';
import { Book } from 'src/app/_models/Book';
import { Category } from 'src/app/_models/Category';
import { AuthorService } from 'src/app/_services/author.service';
import { BookService } from 'src/app/_services/book.service';
import { CategoryService } from 'src/app/_services/category.service';
import { uploadsUrl } from 'src/app/_services/helper';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  popularCategories: Category[] = [];
  popularAuthors: Author[] = [];
  popularBooks: Book[] = [];
  authorImage: string = '';
  bookImage: string = '';
  subscriptions: Subscription[] = [];

  constructor(private _categoryService: CategoryService, private _authorService: AuthorService, private _bookService: BookService) { }

  ngOnInit(): void {
    this.subscriptions.push(this._categoryService.getPopularCategory().subscribe(response => {
      this.popularCategories = response.Popularcategories;
    }));

    this.subscriptions.push(this._bookService.getPopularBooks().subscribe(response => {
      this.popularBooks = response.data.popularBooks;
      this.popularBooks.forEach(book => book.avgRating = Math.round((book.avgRating || 0) * 100) / 100);
      this.popularAuthors = response.data.popularAuthor;

      // populate author fullname into book object
      this.popularBooks.forEach(book => {
        book.image = `${uploadsUrl}/books/${book?.image}`;
      });

      this.popularAuthors.forEach(author => {
        author.image = `${uploadsUrl}/authors/${author?.image}`;
      });

    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
