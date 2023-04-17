import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthorService } from '../_services/author.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-add-author',
  templateUrl: './add-author.component.html',
  styleUrls: ['./add-author.component.css']
})
export class AddAuthorComponent implements OnInit {
  authorForm: FormGroup | undefined;
  errorMessage!: string;
  selectedImage: File | null = null;
  isLoading: boolean = true;
  subscribtion!: Subscription;

  constructor(private formBuilder: FormBuilder, private authorService: AuthorService, private router: Router) {
    this.createForm();
  }
  ngOnInit(): void {
    this.isLoading = false;
  }

  createForm() {
    this.authorForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
      lastName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
      dob: ['', [Validators.required]],
      image: [[''], [Validators.required]]
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

    this.subscribtion = this.authorService.createAuthor(formData)
      .subscribe(
        data => {
          this.authorForm!.reset();
          this.selectedImage = null;
          this.errorMessage = '';
          this.router.navigate(['auhtor']);
        },
        error => {
          this.errorMessage = 'Invalid Data';
        }
      );
  }

  ngOnDestroy() {
    this.subscribtion.unsubscribe();
  }
}

