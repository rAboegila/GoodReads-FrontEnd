import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

import { BookShelf } from 'src/app/_models/Book';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BookService } from 'src/app/_services/book.service';
import { Library } from 'src/app/_models/User';
import { uploadsUrl } from 'src/app/_services/helper';

@Component({
  selector: 'app-book-shelf',
  templateUrl: './book-shelf.component.html',
  styleUrls: ['./book-shelf.component.css']
})
export class BookShelfComponent implements OnInit {

  myLib: Library[] = [];
  isLoading = true;
  @Input() shelf!: string;
  @Output() updatedLib = new EventEmitter<Library[]>();

  constructor(private _userService: UserService, private _bookService: BookService, private formBuilder: FormBuilder, private snackBar: MatSnackBar) {

  }

  ngOnInit(): void {
    this._userService.user.subscribe(data => {
      this.updateLibrary(data);
      console.log(this.myLib);
      this.isLoading = false;
    });
  }
  setShelfValue(libItem: Library, rawValue: string) {
    const newValue: BookShelf = rawValue === 'READ' ? BookShelf.READ : rawValue === 'READING' ? BookShelf.READING : BookShelf.WANT_TO_READ;
    this._userService.updateLibrary(libItem.bookId, newValue, libItem.rating).subscribe((res) => {
      this.myLib = res?.data?.books;

    })

  }

  setRatingValue(libItem: Library, newRating: number) {
    this._userService.updateLibrary(libItem.bookId, libItem.shelve, newRating).subscribe((res) => {
      this.myLib = res?.data?.books;

    })

  }
  private updateLibrary(data: any) {
    this.myLib = data?.books || data?.data.books || [];
    if (this.myLib) {
      this.populateBooks();
      this.filterLibrary(this.shelf);
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

  getBookImage(libItem: Library): string {
    if (libItem.book) {
      return `${uploadsUrl}/books/${libItem.book.image}`;
    }
    else return '';
  }
  private filterLibrary(filter: string) {
    if (filter != 'ALL') {
      const oldValue = filter;
      let filteredLib: Library[] = [];
      this.myLib.forEach((item) => {
        if (item.shelve === filter) {
          filteredLib.push(item)
        }
      })
      this.myLib = filteredLib;
    }
  }


}
