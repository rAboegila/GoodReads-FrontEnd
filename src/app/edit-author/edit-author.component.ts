import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthorService } from '../_services/author.service';
import { Author } from '../_models/Author';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-edit-author',
  templateUrl: './edit-author.component.html',
  styleUrls: ['./edit-author.component.css']
})
export class EditAuthorComponent implements OnInit {
  authorForm: FormGroup | undefined;
  errorMessage!: string;
  selectedImage: any;
  Author: Author = {
    _id:'',
    firstName: '',
    lastName: '',
    dob: new Date(),
    image: '',
  };
  constructor(
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    private authorService: AuthorService,
    private activatedRoute: ActivatedRoute,
  ) {}

 
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      const id = params['id'];
      if (id) {
        this.getAuthor(id);
      }
    });
    this.createForm();
  }
  getAuthor(id: string) {
    this.authorService.getAuthorById(id).subscribe(
      (res) => {
        this.Author = res;
        // console.log(this.course);
        this.authorForm = this.formBuilder.group({
          firstName: [this.Author.firstName, Validators.required],
          lastName: [this.Author.lastName, Validators.required],
          dob: [null, Validators.required],
          image: [null, Validators.required],
        });
        

      },
      (err) => {
        console.log('Error updating Author ', err);
        console.log(err);
      }
    );
  }

  // ngOnInit(): void {
  //   this.authorForm = this.formBuilder.group({
  //     firstName: [this.data.author.firstName, Validators.required],
  //     lastName: [this.data.author.lastName, Validators.required],
  //     dob: [new Date(this.data.author.dob).toISOString().slice(0, 10), Validators.required],
  //     image: ['']
  //   });
  // }

  createForm() {
    this.authorForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dob: ['', Validators.required],
      image: [''],
    });
  }

  onFileSelected(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.selectedImage = event.target.files[0];
    }
  }

  onSubmit() {
    const author: Author = {
      firstName: this.authorForm!.value.firstName,
      lastName: this.authorForm!.value.lastName,
      dob: this.authorForm!.value.dob,
      image: '',
    };

    const formData = new FormData();
    formData.append('firstName', author.firstName);
    formData.append('lastName', author.lastName);
    formData.append('dob', author.dob.toString());
    if (this.selectedImage) {
      formData.append('image', this.selectedImage, this.selectedImage.name);
    }

    this.authorService.createAuthor(formData).subscribe(
      (response) => {
        console.log(response);
        this.activeModal.close();
      },
      (error) => {
        console.log(error);
        this.errorMessage = error.message;
      }
    );
  }

  updateAuthor() {
    const author: Author = {
      firstName: this.authorForm!.value.firstName,
      lastName: this.authorForm!.value.lastName,
      dob: this.authorForm!.value.dob,
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
    this.authorService.updateAuthor(authorId, formData).subscribe(
      (response) => {
        console.log(response);
        this.activeModal.close();
      },
      (error) => {
        console.log(error);
        this.errorMessage = error.message;
      }
    );
  }
}
