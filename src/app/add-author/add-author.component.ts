import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthorService } from '../_services/author.service';
@Component({
  selector: 'app-add-author',
  templateUrl: './add-author.component.html',
  styleUrls: ['./add-author.component.css']
})
export class AddAuthorComponent implements OnInit {
  authorForm:FormGroup | undefined;
  errorMessage!:string;
  selectedImage: any;
  constructor(private formBuilder: FormBuilder, private authorService: AuthorService) {
    this.createForm();
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  createForm() {
    this.authorForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dob: ['', Validators.required],
      image: ['']
    });
  }

  onFileSelected(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.selectedImage = event.target.files[0];
    }
  }
  onSubmit() {
    const author = this.authorForm!.value;
    const formData = new FormData();
    formData.append('firstName', author.firstName);
    formData.append('lastName', author.lastName);
    formData.append('dob', author.dob.toString());
    if (this.selectedImage) {
      formData.append('image', this.selectedImage, this.selectedImage.name);
    }

    this.authorService.createAuthor(formData)
      .subscribe(
        data => {
          console.log('Author created successfully!');
          console.log(data);
          this.authorForm!.reset();
          this.selectedImage = null;
          this.errorMessage = '';
        },
        error => {
          console.log('Error creating author: ', error);
          this.errorMessage = error.message;
        }
      );
  }
}

