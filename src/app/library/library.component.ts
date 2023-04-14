import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

import { BookShelf } from 'src/app/_models/Book';
import { Library } from '../_models/User';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BookService } from '../_services/book.service';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent {
  myLib: Library[] = [];
  readingShelf: BookShelf = BookShelf.READING;
  readShelf: BookShelf = BookShelf.READ;
  wantToReadShelf: BookShelf = BookShelf.WANT_TO_READ;




  constructor(private _userService: UserService, private _bookService: BookService, private formBuilder: FormBuilder, private snackBar: MatSnackBar) {



  }

  updateLib(data: Library[]) {
    console.log("update library from Child  ", data);
    this.myLib = data;
  }

  // setShelfValue(bookIndex: number, libItem: Library, value: string) {
  //   // const rawValue = this.myForm.controls['shelfSelect'].getRawValue();
  //   const rawValue = value;
  //   console.log("new Value", rawValue);

  //   const newValue: BookShelf = rawValue === 'READ' ? BookShelf.READ : rawValue === 'READING' ? BookShelf.READING : BookShelf.WANT_TO_READ;
  //   // this.myForm.controls['shelfSelect'].setValue(newValue);
  //   this._userService.updateLibrary(libItem.bookId, libItem.shelve, libItem.rating).subscribe((res) => {
  //     console.log("set shelf response", res);
  //   })
  //   this._userService.getProfile().subscribe((res) => {
  //     //this.updateLibrary(res);
  //     console.log("res", res);
  //     console.log("res.data.books", res.data.books);
  //     this.myLib = res?.data?.books || [];
  //     this.populateBooks();

  //   })
  // }

  private updateLibrary(data: any) {
    this.myLib = data?.books || [];
    console.log("user", data);
    console.log("before populate", this.myLib);
    this.populateBooks();
  }

  private populateBooks() {
    this.myLib.forEach(item => {
      this._bookService.getBook(item.bookId).subscribe((res) => {
        const book = res.data;
        item.book = book;
      });

    });
    console.log("after populate in lib", this.myLib);

  }
}
