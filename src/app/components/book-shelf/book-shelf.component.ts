import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

import { BookShelf } from 'src/app/_models/Book';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BookService } from 'src/app/_services/book.service';
import { Library } from 'src/app/_models/User';
import { ChildActivationEnd } from '@angular/router';
@Component({
  selector: 'app-book-shelf',
  templateUrl: './book-shelf.component.html',
  styleUrls: ['./book-shelf.component.css']
})
export class BookShelfComponent {
  myLib: Library[] = [];
  @Output() updatedLib = new EventEmitter<Library[]>();;
  readingShelf: BookShelf = BookShelf.READING;
  readShelf: BookShelf = BookShelf.READ;
  wantToReadShelf: BookShelf = BookShelf.WANT_TO_READ;



  constructor(private _userService: UserService, private _bookService: BookService, private formBuilder: FormBuilder, private snackBar: MatSnackBar) {

    this._userService.user.subscribe(data => {
      // this.myLib = data?.books || data?.data.books || [];
      // if (this.myLib) {
      //   this.myLib.forEach(item => {
      //     this._bookService.getBook(item.bookId).subscribe((res) => {
      //       const book = res.data;
      //       item.book = book;
      //     });

      //   });
      //   console.log("lib before emit", this.myLib);
      //   this.updatedLib.emit(this.myLib)
      // }
      console.log("constructor data", data);
      this.updateLibrary(data);

    });
  }

  setShelfValue(bookIndex: number, libItem: Library, rawValue: string) {
    const newValue: BookShelf = rawValue === 'READ' ? BookShelf.READ : rawValue === 'READING' ? BookShelf.READING : BookShelf.WANT_TO_READ;
    this._userService.updateLibrary(libItem.bookId, newValue, libItem.rating).subscribe((res) => {
      console.log("set shelf response", res);
      console.log("res.data.books", res.data.books);
      this.myLib = res?.data?.books;

    })

  }
  private updateLibrary(data: any) {
    this.myLib = data?.books || data?.data.books || [];
    if (this.myLib) {
      this.populateBooks();

    }
  }

  private populateBooks() {
    this.myLib.forEach(item => {
      this._bookService.getBook(item.bookId).subscribe((res) => {
        const book = res.data;
        item.book = book;
      });

    });
    this.updatedLib.emit(this.myLib)

  }
}
