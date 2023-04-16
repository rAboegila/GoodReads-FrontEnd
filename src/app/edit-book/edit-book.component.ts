import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Book } from '../_models/Book';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookService } from '../_services/book.service';
import { Author } from '../_models/Author';
import { AuthorService } from '../_services/author.service';
import { CategoryService } from '../_services/category.service';
import { Category } from '../_models/Category';
import { SelectControlValueAccessor } from '@angular/forms';
import { environment } from 'environments/environment.prod';



@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css'],
})
export class EditBookComponent1 implements OnInit {
  // url='http://localhost:5000/uploads/books/'
  url=`${environment.url}books/`
  bookId: string = ''
  book: Book = { name: '', category: '', author: {
    _id:'',
    firstName: '',
    lastName: '',
    dob: new Date(),
    image: '',
  } };
  EditbookForm!: FormGroup;
  categories: Category[] = [];
  authors: Author[] = [];
  errorMessage :string | undefined;
  selectedImage!: File | null;
  Book: Book = {
    _id: '',
    name: '',
    category: '',
    author: {
      _id:'',
      firstName: '',
      lastName: '',
      dob: new Date(),
      image: '',
    },
    image: '',
    reviews: [],
    avgRating: 0,
  };
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private bookService: BookService,
    private authorService: AuthorService,
    private categoryService: CategoryService,
    private activatedRoute: ActivatedRoute,

  ) { }

 

    ngOnInit(): void {
      this.activatedRoute.params.subscribe((params) => {
        const id = params['id'];
        this.bookId=id;
        console.log(id);

        if (id) {
          this.getBook(id);
        }
      });


      this.categoryService.getCategories().subscribe(
        data => this.categories = data.data ,
        error => console.log(error)

      );


      this.authorService.getAuthors().subscribe(
        data => this.authors = data.data,
        error => console.log(error)
      );


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
    this.bookService.getBook(id).subscribe(
      (res) => {
        this.book = res;
      this.book=res.data

        this.EditbookForm = this.fb.group({
          name: [this.book.name, Validators.required],
          category: [null, Validators.required],
          author: [this.book.author, Validators.required],
          image: [null, Validators.required],
        });


      },
      (err) => {
        console.log('Error updating book ', err);
        console.log(err);
      }
    );
  }
  uploadImage(event: any) {
    this.files = event.target.files[0];
    // console.log(this.files);
  }
  files: any;
  submitted = false;
  updateBook(id: string, EditbookForm: any) {
    this.submitted = true;
    if (this.EditbookForm.invalid) {
      console.log('form invalid');
    }
    const formdata = new FormData();
    // formdata.append('image', this.files, this.files.name);
    if (this.files) {
      formdata.append('image', this.files, this.files.name);
    }
    formdata.append('name', EditbookForm.value.name);
    formdata.append('category', EditbookForm.value.category);
    formdata.append('author', EditbookForm.value.author);

    console.log(id);

    this.bookService.updateBook(this.bookId,formdata).subscribe(
      (res) => {
        // console.log(res);
        this.router.navigate(['Books']);
        this.EditbookForm!.reset();
        this.selectedImage!= null;
        this.errorMessage = '';
        console.log(res)
      },
      (err) => {
        console.log('Error updating book ');
        this.errorMessage = 'Invalid value';
      }
    );
  }
  id(id: any, formdata: FormData) {
    throw new Error('Method not implemented.');
  }

}