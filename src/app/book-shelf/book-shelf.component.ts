import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Book, BookShelf } from 'src/app/_models/Book';
import { Library } from '../_models/User';
import { Form, FormBuilder, FormGroup } from '@angular/forms';
import { BookService } from '../_services/book.service';
import { AuthorService } from '../_services/author.service';

@Component({
  selector: 'app-book-shelf',
  templateUrl: './book-shelf.component.html',
  styleUrls: ['./book-shelf.component.css']
})
export class BookShelfComponent {
  myLib: Library[] = [];
  readingShelf: BookShelf = BookShelf.READING;
  readShelf: BookShelf = BookShelf.READ;
  wantToReadShelf: BookShelf = BookShelf.WANT_TO_READ;

  myForm: FormGroup;


  constructor(private _userService: UserService, private _bookService: BookService, private formBuilder: FormBuilder, private snackBar: MatSnackBar) {

    this.myForm = this.formBuilder.group({
      shelfSelect: ''
    });


    this._userService.user.subscribe(x => {

      this.myLib = x?.books || [];
      this.populateBooks();
    });
  }


  populateBooks() {

    this.myLib.forEach(item => {
      this._bookService.getBook(item.bookId).subscribe((res) => {
        const book = res.data;
        item.book = book;
      });
      console.log(this.myLib);

    });
  }
  setShelfValue(libItem: Library) {
    const rawValue = this.myForm.controls['shelfSelect'].getRawValue();
    const newValue: BookShelf = rawValue === 'READ' ? BookShelf.READ : rawValue === 'READING' ? BookShelf.READING : BookShelf.WANT_TO_READ;
    this.myForm.controls['shelfSelect'].setValue(newValue);
    this._userService.updateLibrary(libItem.bookId, libItem.shelve, libItem.rating).subscribe((res) => {
      console.log(res);
      this.populateBooks();

    })
  }
}
