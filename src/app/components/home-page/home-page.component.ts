import { Component } from '@angular/core';
import { Author } from 'src/app/_models/Author';
import { Book } from 'src/app/_models/Book';
import { Category } from 'src/app/_models/Category';
import { AuthorService } from 'src/app/_services/author.service';
import { BookService } from 'src/app/_services/book.service';
import { CategoryService } from 'src/app/_services/category.service';
import { uploadsUrl } from 'src/app/_services/helper';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {
  popularCategories: Category[] = [];
  popularAuthors: Author[] = [];
  popularBooks: Book[] = [];
  authorImage: string = '';
  bookImage: string = '';
  isLoading: boolean = true;

  constructor(private _categoryService: CategoryService, private _authorService: AuthorService, private _bookService: BookService) { }

  ngOnInit(): void {
    this._categoryService.getPopularCategory().subscribe(response => {
      this.popularCategories = response.Popularcategories;
    });

    this._bookService.getPopularBooks().subscribe(response => {
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
      this.isLoading = false;
    });
  }
}
