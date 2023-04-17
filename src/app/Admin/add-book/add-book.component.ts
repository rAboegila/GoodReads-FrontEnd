import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Book } from 'src/app/_models/Book';
import { AuthorService } from 'src/app/_services/author.service';
import { BookService } from 'src/app/_services/book.service';
import { CategoryService } from 'src/app/_services/category.service';
@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {

  bookForm!: FormGroup;
  categories: any[] = [];
  authors: any[] = [];
  selectedImage!: File;
  errorMessage: string | undefined;
  isLoading: boolean = true;
  subscrbtions: Subscription[] = [];

  constructor(private bookService: BookService, private categoryService: CategoryService, private authorService: AuthorService, private router: Router) {
    this.bookForm = new FormGroup({
      name: new FormControl(''),
      category: new FormControl(''),
      author: new FormControl(''),
      image: new FormControl('')
    });
  }

  ngOnInit(): void {
    this.bookForm = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
      category: new FormControl(null, Validators.required),
      author: new FormControl(null, Validators.required),
      image: new FormControl(null, Validators.required),
      avgRating: new FormControl(0)
    });

    this.subscrbtions.push(this.categoryService.getCategories().subscribe(
      data => this.categories = data.data,
      error => console.log(error)
    ));


    this.subscrbtions.push(this.authorService.getAuthors().subscribe(
      data => {
        this.authors = data.data
        this.isLoading = false;
      },
      error => console.log(error)
    ));
  }

  onSubmit() {
    const book = this.bookForm!.value;
    const formData = new FormData();
    formData.append('name', book.name);
    formData.append('category', book.category);
    formData.append('author', book.author);
    formData.append('avgRating', book.avgRating.toString());
    if (this.selectedImage) {
      formData.append('image', this.selectedImage, this.selectedImage.name);
    }

    this.subscrbtions.push(this.bookService.createBook(formData)
      .subscribe(
        data => {
          this.bookForm!.reset();
          this.selectedImage != null;
          this.errorMessage = '';
          this.router.navigate(['Books']);

        },
        error => {
          console.log('Error creating book: ', error);
          this.errorMessage = 'Invalid value';
        }
      ));
  }

  onImageSelected(event: any) {
    const file: File = event.target.files[0];
    this.selectedImage = file;
  }

  ngOnDestroy() {
    this.subscrbtions.forEach(sub => sub.unsubscribe());
  }

}
