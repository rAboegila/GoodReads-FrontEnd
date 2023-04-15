import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'environments/environment.prod';
import { Author } from 'src/app/_models/Author';
import { Book, BookShelf } from 'src/app/_models/Book';
import { Library } from 'src/app/_models/User';
import { AuthorService } from 'src/app/_services/author.service';
import { uploadsUrl } from 'src/app/_services/helper';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-author-details',
  templateUrl: './author-details.component.html',
  styleUrls: ['./author-details.component.css']
})
export class AuthorDetailsComponent {

  url = `${environment.url}authors/`
  myLib: Library[] = [];
  all = "ALL";

  author: Author = { _id: '', firstName: '', lastName: '', dob: new Date(), image: '' };

  constructor(private _activatedRoute: ActivatedRoute, private _authorService: AuthorService, private _userService: UserService) { }

  ngOnInit(): void {
    const id = this._activatedRoute.snapshot.paramMap.get('id');
    this._authorService.getAuthorById(id as string).subscribe(data => {
      this.author = data.data;
    });

    this._authorService.getAuthorBooks(id as string).subscribe(data => {
      // console.log(data);
      data.data.forEach((book: any) => {
        this.myLib.push({
          _id: '',
          bookId: book._id,
          rating: book.totalRatings,
          shelve: BookShelf.WANT_TO_READ,
          book: book
        });
      });
    });
  }

  setRatingValue(libItem: Library, newRating: number) {
    this._userService.updateLibrary(libItem.bookId, libItem.shelve, newRating).subscribe((res) => {
      console.log(res);
      this.myLib.forEach((item: Library) => {
        res.data.books.forEach((lib: Library) => {
          if (lib.bookId === libItem.bookId) {
            item.book!.avgRating = lib.rating;
          }
        });
      });
    })
  }

}
