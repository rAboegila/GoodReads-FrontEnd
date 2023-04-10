import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Author } from 'src/app/_models/Author';

@Component({
  selector: 'app-author-dialog',
  templateUrl: './author-dialog.component.html',
  styleUrls: ['./author-dialog.component.css']
})
export class AuthorDialogComponent{
  form!: FormGroup;
lastName: any;
firstName: any;
dob: any;

constructor(
  private fb: FormBuilder,
  public dialogRef: MatDialogRef<AuthorDialogComponent>,
  @Inject(MAT_DIALOG_DATA) public data: Author
) {
  this.createForm();
}
createForm() {
  this.form = this.fb.group({
    image: [this.data.image],
    firstName: [this.data.firstName, Validators.required],
    lastName: [this.data.lastName, Validators.required],
    dob: [this.data.dob, Validators.required]
  });
}

onNoClick(): void {
  this.dialogRef.close();
}

onSaveClick(): void {
  const author: Author = {
    _id: this.data._id,
    ...this.form.value
  };
  this.dialogRef.close(author);
}

getErrorMessage(controlName: string) {
  if (this.form.controls[controlName].hasError('required')) {
    return `You must enter a ${controlName}`;
  }
  return '';
}
getFirstNameErrorMessage() {
  if (this.form.controls['firstName'].hasError('required')) {
    return 'You must enter a first name';
  }
  return '';
}

getDobErrorMessage() {
  if (this.form.controls['dob'].hasError('required')) {
    return 'You must enter a date of birth';
  }
  return '';
}

getLastNameErrorMessage() {
  if (this.form.controls['lastName'].hasError('required')) {
    return 'You must enter a last name';
  }
  return '';
}



}