import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from '../_models/Book';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookService } from '../_services/book.service';
import { Author } from '../_models/Author';
import { AuthorService } from '../_services/author.service';
import { CategoryService } from '../_services/category.service';
import { Category } from '../_models/Category';
import { environment } from 'environments/environment.prod';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css'],
})
export class EditBookComponent1 implements OnInit {
  url = `${environment.url}books/`
  bookId: string = ''
  book: Book = {
    name: '', category: '', author: {
      _id: '',
      firstName: '',
      lastName: '',
      dob: new Date(),
      image: '',
    }
  };
  EditbookForm!: FormGroup;
  categories: Category[] = [];
  authors: Author[] = [];
  errorMessage: string | undefined;
  selectedImage!: File | null;
  cate!: string;
  Book: Book = {
    _id: '',
    name: '',
    category: '',
    author: {
      _id: '',
      firstName: '',
      lastName: '',
      dob: new Date(),
      image: '',
    },
    image: '',
    reviews: [],
    avgRating: 0,
  };
  subscriptions: Subscription[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private bookService: BookService,
    private authorService: AuthorService,
    private categoryService: CategoryService,
    private activatedRoute: ActivatedRoute,

  ) { }



  ngOnInit(): void {
    this.subscriptions.push(this.activatedRoute.params.subscribe((params) => {
      const id = params['id'];
      this.bookId = id;

      if (id) {
        this.getBook(id);
      }
    }));


    this.subscriptions.push(this.categoryService.getCategories().subscribe(
      data => this.categories = data.data,
      error => console.log(error)
    ));


    this.subscriptions.push(this.authorService.getAuthors().subscribe(
      data => this.authors = data.data,
      error => console.log(error)
    ));
    this.createEditbookForm();
  }

  onFileSelected(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.selectedImage = event.target.files[0];
    }
  }
  createEditbookForm(): void {
    this.EditbookForm = this.fb.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      author: ['', Validators.required],
      image: ['']
    });
  }


  getBook(id: string) {
    this.subscriptions.push(this.bookService.getBook(id).subscribe(
      (res) => {
        this.book = res;
        this.book = res.data

        this.EditbookForm = this.fb.group({
          name: [this.book.name, Validators.required],
          category: [null, Validators.required],
          author: [this.book.author, Validators.required],
          image: [null, Validators.required],
        });

      },
      (err) => {
        console.log('Error updating book ', err);
      }
    ));
  }
  uploadImage(event: any) {
    this.files = event.target.files[0];
  }
  files: any;
  submitted = false;
  updateBook(id: string, EditbookForm: any) {
    this.submitted = true;
    const formdata = new FormData();
    if (this.files) {
      formdata.append('image', this.files, this.files.name);
    }
    formdata.append('name', EditbookForm.value.name);
    formdata.append('category', EditbookForm.value.category);
    formdata.append('author', EditbookForm.value.author);

    this.subscriptions.push(this.bookService.updateBook(this.bookId, formdata).subscribe(
      (res) => {
        // console.log(res);
        this.router.navigate(['Books']);
        this.EditbookForm!.reset();
        this.selectedImage != null;
        this.errorMessage = '';
      },
      (err) => {
        this.errorMessage = 'Invalid value';
      }
    ));
  }
  id(id: any, formdata: FormData) {
    throw new Error('Method not implemented.');
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
