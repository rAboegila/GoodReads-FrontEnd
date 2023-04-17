import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'environments/environment.prod';
import { Author } from 'src/app/_models/Author';
import { Book, BookShelf } from 'src/app/_models/Book';
import { Library } from 'src/app/_models/User';
import { AuthorService } from 'src/app/_services/author.service';
import { UserService } from 'src/app/_services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { LoginRedirectDialogComponent } from '../login-redirect-dialog/login-redirect-dialog.component';

@Component({
  selector: 'app-author-details',
  templateUrl: './author-details.component.html',
  styleUrls: ['./author-details.component.css']
})
export class AuthorDetailsComponent {

  authorsUrl = `${environment.url}authors/`
  booksUrl = `${environment.url}books/`
  isLoggedIn: boolean = false;
  authorLib: Library[] = [];
  authorBooks: Book[] = [];
  userLib: Library[] = [];
  author: Author = { _id: '', firstName: '', lastName: '', dob: new Date(), image: '' };

  constructor(private _activatedRoute: ActivatedRoute, private _authorService: AuthorService, private _userService: UserService, private snackBar: MatSnackBar, public dialog: MatDialog) {
    this._userService.user.subscribe((x) => {
      this.isLoggedIn = !!x;
    });
  }

  ngOnInit(): void {
    const id = this._activatedRoute.snapshot.paramMap.get('id');
    this._authorService.getAuthorById(id as string).subscribe(data => {
      this.author = data.data;
    });

    // get author books
    this._authorService.getAuthorBooks(id as string).subscribe(data => {
      this.authorBooks = data.data;
      this.authorBooks.forEach(book => book.avgRating = Math.round((book.avgRating || 0) * 100) / 100);

      // get user libraries
      if (!this.isLoggedIn) {
        this.userLib = this.authorBooks.map((book: Book) => {
          return {
            _id: book._id as string,
            bookId: book._id as string,
            // default values for rating and shelve
            rating: 0,
            shelve: BookShelf.READING,
            book: book,
            new: true,
          }
        });
        return
      };

      this._userService.getProfile().subscribe((res) => {
        this.userLib = res.data.books;

        // merge them and filter out the books that don't belong to the author
        let dummy: Library[] = [];
        for (let i = 0; i < this.authorBooks.length; i++) {
          const book = this.authorBooks[i];
          let bookFound = false;
          for (let j = 0; j < this.userLib.length; j++) {
            const lib = this.userLib[j];
            if (lib.bookId === book._id) {
              bookFound = true;
              lib.book = book;
              lib.new = false;
              dummy.push(lib);
            }
          }
          if (!bookFound) {
            const defaultLib: Library = {
              _id: book._id as string,
              bookId: book._id as string,
              // default values for rating and shelve
              rating: 0,
              shelve: BookShelf.READING,
              book: book,
              new: true,
            }
            dummy.push(defaultLib);
          }
        }
        this.userLib = dummy;
        // console.log(this.userLib);
      });
    });
  }

  setRatingValue(libItem: Library, newRating: number) {
    this._userService.updateLibrary(libItem.bookId, libItem.shelve, newRating).subscribe((res) => {
      // update author books avg ratings
      this.updateAuthoBooksRatings();
    })
  }

  updateAuthoBooksRatings() {
    this._authorService.getAuthorBooks(this.author._id as string).subscribe((res) => {
      this.authorBooks.forEach((book: Book) => {
        res.data.forEach((newBook: Book) => {
          console.log(newBook);
          if (newBook._id === book._id) {
            book.avgRating = Math.round((newBook.avgRating || 0) * 100) / 100;
            book.totalRatings = newBook.totalRatings;
          }
        });
      });
    });
  }

  setShelfValue(libItem: Library, rawValue: string) {
    const newValue: BookShelf = rawValue === 'READ' ? BookShelf.READ : rawValue === 'READING' ? BookShelf.READING : BookShelf.WANT_TO_READ;
    // check if library already exists for user
    if (libItem.new) {
      this._userService.addLibrary(libItem.bookId, newValue, libItem.rating).subscribe((res) => {
        // update library item new value status
        this.userLib.forEach((lib: Library) => {
          if (lib.bookId === libItem.bookId) {
            lib.new = false;
          }
        });
        this.snackBar.open('Book Added To Your Library!', 'OK', { duration: 2000, verticalPosition: 'top', horizontalPosition: 'end', panelClass: ['success-snackbar'] });
      })
    } else {
      this._userService.updateLibrary(libItem.bookId, newValue, libItem.rating).subscribe((res) => {
        if (rawValue === 'none') return;
        this.snackBar.open("Your Library is Updated!", 'OK', { duration: 2000, verticalPosition: 'top', horizontalPosition: 'end', panelClass: ['success-snackbar'] });
      })
    }
  }

  checkLoggedIn() {
    if (!this.isLoggedIn) {
      this.openDialog('0ms', '0ms');
    }
  }

  checkAddedToLib(libItem: Library) {
    if (libItem.new) {
      this.snackBar.open('Please Add Book To Your Library First!', '', { duration: 2000, verticalPosition: 'top', horizontalPosition: 'end', panelClass: ['info-snackbar'] });
    }
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

}
