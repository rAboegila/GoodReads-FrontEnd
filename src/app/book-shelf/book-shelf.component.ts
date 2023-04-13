import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Book } from 'src/app/_models/Book';
import { Form, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-book-shelf',
  templateUrl: './book-shelf.component.html',
  styleUrls: ['./book-shelf.component.css']
})
export class BookShelfComponent {
  myBooks: Book[] = [];
  myForm: FormGroup;

  constructor(private _userService: UserService, private formBuilder: FormBuilder, private snackBar: MatSnackBar) {

    this.myForm = this.formBuilder.group({
      shelfSelect: ''
    });

    this._userService.user.subscribe(x => {

      this.myBooks = x?.books || [];
      console.log(this.myBooks);
    });
  }

  setShelfValue(value: String) {
    this.myForm.controls['shelfSelect'].setValue(value);
  }
}
