import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

import { BookShelf } from 'src/app/_models/Book';
import { Library } from '../_models/User';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BookService } from '../_services/book.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-library',
  templateUrl: './user-library.component.html',
  styleUrls: ['./user-library.component.css']
})
export class UserLibraryComponent {
  myLib: Library[] = [];

  all = "ALL";
  read = "READ";
  reading = "READING";
  wantToRead = "WANT_TO_READ";
  subscriptions: Subscription[] = [];

  constructor(private _bookService: BookService) {
  }

  updateLib(data: Library[]) {
    this.myLib = data;
  }

  private updateLibrary(data: any) {
    this.myLib = data?.books || [];
    this.populateBooks();
  }

  private populateBooks() {
    this.myLib.forEach(item => {
      this.subscriptions.push(this._bookService.getBook(item.bookId).subscribe((res) => {
        const book = res.data;
        item.book = book;
      }));

    });
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
