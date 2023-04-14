import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Author } from 'src/app/_models/Author';
import { Book, BookShelf } from 'src/app/_models/Book';
import { Category } from 'src/app/_models/Category';
import { BookService } from 'src/app/_services/book.service';
import { uploadsUrl } from 'src/app/_services/helper';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-single-book',
  templateUrl: './single-book.component.html',
  styleUrls: ['./single-book.component.css']
})
export class SingleBookComponent {

  id: string = '';
  category: Category = { _id: '', name: '' };
  author: Author = { _id: '', firstName: '', lastName: '', dob: new Date() };
  book: Book = { name: '', category: this.category, author: this.author };
  bookImage: string = '';
  myForm: FormGroup;

  constructor(private _bookService: BookService, private _activatedRoute: ActivatedRoute, private formBuilder: FormBuilder, private _userService: UserService) {

    this.id = this._activatedRoute.snapshot.params['id'];

    this._bookService.getBook(this.id).subscribe({
      next: (res) => {
        console.log(res.data);
        this.book = res.data;
        this.bookImage = `${uploadsUrl}/books/${this.book?.image}` || '';

        // this._router.navigate(['/']);

      },
      error: error => {
        console.log(error);
      }
    });

    this.myForm = this.formBuilder.group({
      shelfSelect: ''
    });

  }

  setShelfValue(value: String) {
    this.myForm.controls['shelfSelect'].setValue(value);
  }

  updateRating(rating: number, bookId: string, bookShelf: BookShelf) {
    this._userService.updateLibrary(bookId, bookShelf, rating).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: error => {
        console.log(error);
      }
    });
  }

}
