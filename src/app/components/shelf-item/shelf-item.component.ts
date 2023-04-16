import { Component, Input } from '@angular/core';
import { Form, FormBuilder, FormGroup } from '@angular/forms';
import { Book } from 'src/app/_models/Book';

@Component({
  selector: 'app-shelf-item',
  templateUrl: './shelf-item.component.html',
  styleUrls: ['./shelf-item.component.css']
})
export class ShelfItemComponent {
  @Input() book!: Book;
  myForm: FormGroup;


  constructor(private formBuilder: FormBuilder) {

    this.myForm = this.formBuilder.group({
      shelfSelect: ''
    });
  }
  setShelfValue(value: String) {
    this.myForm.controls['shelfSelect'].setValue(value);
  }
}
