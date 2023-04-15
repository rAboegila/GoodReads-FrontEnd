import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

import { BookShelf } from 'src/app/_models/Book';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BookService } from 'src/app/_services/book.service';
import { Library } from 'src/app/_models/User';

@Component({
  selector: 'app-book-shelf',
  templateUrl: './book-shelf.component.html',
  styleUrls: ['./book-shelf.component.css']
})
export class BookShelfComponent {
  myLib: Library[] = [];
  @Input() filter = '';
  @Output() updatedLib = new EventEmitter<Library[]>();


  constructor(private _userService: UserService, private _bookService: BookService, private formBuilder: FormBuilder, private snackBar: MatSnackBar) {

    this._userService.user.subscribe(data => {
      console.log("constructor data", data);
      this.updateLibrary(data);

    });
  }

  setShelfValue(libItem: Library, rawValue: string) {
    const newValue: BookShelf = rawValue === 'READ' ? BookShelf.READ : rawValue === 'READING' ? BookShelf.READING : BookShelf.WANT_TO_READ;
    this._userService.updateLibrary(libItem.bookId, newValue, libItem.rating).subscribe((res) => {
      console.log("set shelf response", res);
      console.log("res.data.books (shelf)", res.data.books);
      this.myLib = res?.data?.books;

    })

  }

  setRatingValue(libItem: Library, newRating: number) {
    this._userService.updateLibrary(libItem.bookId, libItem.shelve, newRating).subscribe((res) => {
      console.log("set rating response", res);
      console.log("res.data.books (rating)", res.data.books);
      this.myLib = res?.data?.books;

    })

  }
  private updateLibrary(data: any) {
    this.myLib = data?.books || data?.data.books || [];
    if (this.myLib) {
      this.populateBooks();
      this.filterLibrary();
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

  // private filterLibrary() {
  //   console.log("filter value", this.filter);
  //   if (this.filter != 'ALL') {

  //     const oldValue = this.filter;
  //     const myFilter = oldValue === 'READ' ? BookShelf.READ : oldValue === 'READING' ? BookShelf.READING : BookShelf.WANT_TO_READ;
  //     console.log('inside if filter funtion');

  //     this.myLib = this.myLib.filter((libItem) => { libItem.shelve === myFilter })
  //     console.log("after filter", this.myLib);
  //   }
  // }

  private filterLibrary() {
    console.log("filter value", this.filter);
    // if (this.filter !== 'ALL') {
    //   const myFilter = this.filter === 'READ' ? BookShelf.READ : this.filter === 'READING' ? BookShelf.READING : BookShelf.WANT_TO_READ;
    //   console.log('inside if filter function');

    //   this.myLib = this.myLib.filter((libItem) => libItem.shelve === myFilter);
    //   console.log("after filter", this.myLib);
    // }
  }

  
}
