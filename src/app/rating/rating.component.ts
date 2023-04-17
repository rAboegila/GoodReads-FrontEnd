import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Library } from 'src/app/_models/User';
import { Book, BookShelf } from '../_models/Book';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent {
  @Input('rating') rating!: number | undefined;
  @Input('libItem') libItem!: Library | Book;
  @Input('starCount') private starCount: number = 5;
  @Input('type') type!: string;
  @Input('color') color: string = 'accent';
  @Output() ratingUpdated = new EventEmitter<number>();

  private snackBarDuration: number = 2000;
  ratingArr: number[] = [];
  subscriptions: Subscription[] = [];

  constructor(private _userService: UserService, private snackBar: MatSnackBar) {

  }

  ngOnInit() {
    for (let index = 0; index < this.starCount; index++) {
      this.ratingArr.push(index);
    }
  }

  onClick(rating: number) {
    this.snackBar.open('You rated ' + rating + ' / ' + this.starCount, '', {
      duration: this.snackBarDuration
    });
    this.rating = rating;
    this.ratingUpdated.emit(rating);
    if ("bookId" in this.libItem) {
      this.subscriptions.push(this._userService.updateLibrary(this.libItem.bookId, this.libItem.shelve, rating).subscribe(
      ));
    }
    else if ("name" in this.libItem && this.libItem._id) {
      this.subscriptions.push(this._userService.updateLibrary(this.libItem._id, BookShelf.ALL, rating).subscribe(
      ));
    }
    return false;
  }

  showIcon(index: number) {
    // console.log(this.libItem.book?.name, " >> \n\t", this.libItem)
    if (this.rating) {
      if (this.rating >= index + 1) {
        return 'star';
      } else {
        return 'star_border';
      }
    }
    else return 'star_border';

  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}

export enum StarRatingColor {
  primary = "primary",
  accent = "accent",
  warn = "warn"
}