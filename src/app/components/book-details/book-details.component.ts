import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Book, BookShelf } from 'src/app/_models/Book';
import { Library } from 'src/app/_models/User';
import { BookService } from 'src/app/_services/book.service';
import { uploadsUrl } from 'src/app/_services/helper';
import { UserService } from 'src/app/_services/user.service';
import { LoginRedirectDialogComponent } from '../login-redirect-dialog/login-redirect-dialog.component';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css'],
})
export class BookDetailsComponent implements OnInit {
  isLoading = true;
  book: Book | undefined;
  isLoggedIn: boolean = false;
  userRole: string = '';
  imageURL: string = '';
  private userLib: Library[] | undefined;
  private libItem: Library | undefined;
  shelf: string = 'none';
  constructor(
    private route: ActivatedRoute,
    private _userService: UserService,
    private _bookService: BookService,
    public dialog: MatDialog
  ) {
    this._userService.user.subscribe((x) => {
      this.isLoggedIn = !!x;
      this.userRole = x?.role || '';
      this.userLib = x?.books || [];
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this._bookService.getBook(id as string).subscribe((res) => {
      this.book = res.data;
      this.imageURL = `${uploadsUrl}/books/${this.book?.image}`;
      this.findBook();
      this.isLoading = false;
    });
  }

  addBook(bookID: string | undefined, shelf: string) {
    if (this.isLoggedIn && !this.libItem) {
      if (bookID) {
        this._userService.addBookToLibrary(bookID, shelf).subscribe((res) => {
          this.book = res.data;
          console.log(this.book);
        });
      }
    } else if (this.isLoggedIn && this.libItem) {
      this.setShelfValue(this.libItem, this.shelf);
    } else this.openDialog('0ms', '0ms');
  }

  openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    this.dialog.open(LoginRedirectDialogComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
  setShelfValue(libItem: Library, rawValue: string) {
    const newValue: BookShelf =
      rawValue === 'READ'
        ? BookShelf.READ
        : rawValue === 'READING'
          ? BookShelf.READING
          : BookShelf.WANT_TO_READ;
    this._userService
      .updateLibrary(libItem.bookId, newValue, libItem.rating)
      .subscribe((res) => {
        this.userLib = res?.data?.books;
        this.findBook();
      });
  }
  findBook() {
    const libIndex = this.userLib?.findIndex(
      (elem) => elem.bookId === this.book?._id
    );
    if (libIndex && libIndex > 0) {
      this.libItem = this.userLib?.at(libIndex);
      this.shelf = String(this.libItem?.shelve);
    }
  }
  reviewIsEmpty(): boolean {
    if (this.book?.reviews) {
      return this.book?.reviews?.length === 0;
    }
    return true;
  }

  roundRating(num: number | undefined) {
    if (num) {
      let roundedNum: number = parseFloat(num.toFixed(1));
      //let roundedNum: number = Math.round(num * 10) / 10; // roundedNum will be 3.1

      return roundedNum;
    } else return null;
  }
}
