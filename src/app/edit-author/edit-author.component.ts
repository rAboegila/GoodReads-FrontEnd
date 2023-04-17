import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthorService } from '../_services/author.service';
import { Author } from '../_models/Author';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'environments/environment.prod';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-edit-author',
  templateUrl: './edit-author.component.html',
  styleUrls: ['./edit-author.component.css']
})
export class EditAuthorComponent {
  authorFormEdit: FormGroup | undefined;
  selectedImage: any;
  authorID: any;
  errorMessage: string | undefined;
  subscriptions: Subscription[] = [];

  url = `${environment.url}authors/`

  Author: Author = {
    _id: '',
    firstName: '',
    lastName: '',
    dob: new Date(),
    image: '',
  };
  constructor(
    private formBuilder: FormBuilder,
    private authorService: AuthorService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }


  ngOnInit(): void {
    this.subscriptions.push(this.activatedRoute.params.subscribe((params) => {
      const id = params['id'];
      this.authorID = params['id']
      if (id) {
        this.getAuthor(id);
      }
    }));
    this.createForm();
  }
  getAuthor(id: string) {
    this.subscriptions.push(this.authorService.getAuthorById(id).subscribe(
      (res) => {
        this.Author = res.data;
        this.authorFormEdit = this.formBuilder.group({
          firstName: [this.Author.firstName, Validators.required],
          lastName: [this.Author.lastName, Validators.required],
          dob: [null, Validators.required],
          image: [null, Validators.required],
        });

      },
      (err) => {
        console.log('Error updating Author ', err);
      }
    ));
  }

  createForm() {
    this.authorFormEdit = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
      lastName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
      dob: ['', [Validators.required]],
      image: [''],
    });
  }

  onFileSelected(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.selectedImage = event.target.files[0];
    }
  }


  onupdate() {
    const author: Author = {
      firstName: this.authorFormEdit!.value.firstName,
      lastName: this.authorFormEdit!.value.lastName,
      dob: this.authorFormEdit!.value.dob,
      image: '',
    };

    const formData = new FormData();
    formData.append('firstName', author.firstName);
    formData.append('lastName', author.lastName);
    if (this.authorFormEdit) {
      const authorData = this.authorFormEdit.value;
      authorData.id = this.Author._id;
      // const formData = new FormData();
      for (const key of Object.keys(authorData)) {
        if (key !== 'image') {
          formData.append(`Author.${key}`, authorData[key]);
        } else {
          formData.append(key, authorData[key]);
        }
      }
    }

    if (this.selectedImage) {
      formData.append('image', this.selectedImage, this.selectedImage.name);
    }

    this.subscriptions.push(this.authorService.updateAuthor(this.authorID, formData).subscribe(
      (response) => {
        this.router.navigate(['auhtor']);
        this.authorFormEdit!.reset();
        this.selectedImage != null;
        this.errorMessage = '';

      },
      (error) => {
        console.log(error);
        this.errorMessage = 'Invalid value';

      }
    ));
  }

  updateAuthor() {
    const author: Author = {
      firstName: this.authorFormEdit!.value.firstName,
      lastName: this.authorFormEdit!.value.lastName,
      dob: this.authorFormEdit!.value.dob,
      image: '',
    };

    const formData = new FormData();
    formData.append('firstName', author.firstName);
    formData.append('lastName', author.lastName);
    formData.append('dob', author.dob.toString());
    if (this.selectedImage) {
      formData.append('image', this.selectedImage, this.selectedImage.name);
    }

    const authorId = ''; // Set the author ID to the ID of the author you want to update
    this.subscriptions.push(this.authorService.updateAuthor(authorId, formData).subscribe(
      (response) => {
        // this.activeModal.close();
        this.errorMessage = '';

      },
      (error) => {
        this.errorMessage = error.message;
      }
    ));
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
