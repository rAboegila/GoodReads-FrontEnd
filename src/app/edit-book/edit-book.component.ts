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
@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent1 implements OnInit {
  bookId: string = '';
  book: Book = { name: '', category: '', author: '' };
  EditbookForm!: FormGroup;
  categories: Category[] = [];
  authors: Author[] = [];
  selectedImage!: File | null;
  errorMessage = '';
  Book: Book = {
    _id:'',
    name: '',
    category: '',
    author: '',
    image: '',
    reviews: [],
    avgRating:0,
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

  // ngOnInit(): void {
  //   // this.bookId = this.route.snapshot.params['id'];
  //   this.activatedRoute.params.subscribe((params) => {
  //   const id = params['id'];
  //     if (id) {
  //       this.getBook(id);
  //     }
  //   });
    
    ngOnInit(): void {
      this.activatedRoute.params.subscribe((params) => {
        const id = params['id'];
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

    // this.getBook(id);    
  //   this.createEditbookForm();
  //   this.getCategories();
  //   this.getAuthors();

  // }
 
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

  // getCategories(): void {
  //   this.categoryService.getCategories()
  //     .subscribe(
  //       data => {
  //         this.categories = data.categories;
  //       },
  //       error => {
  //         console.log('Error fetching categories: ', error);
  //       }
  //     );
  // }

  // getAuthors(): void {
  //   this.authorService.getAuthors()
  //     .subscribe(
  //       data => {
  //         this.authors = data;
  //       },
  //       error => {
  //         console.log('Error fetching authors: ', error);
  //       }
  //     );
  // }

  // getBook(id: string) {
  //   this.bookService.getBook(id)
  //     .subscribe(
  //       data => {
  //         this.book = data.book;
  //         this.EditbookForm.setValue({
  //           name: this.book.name,
  //           category: this.book.category,
  //           author: this.book.author,
  //           image: ''
  //         });
  //       },
  //       error => {
  //         console.log('Error fetching book: ', error);
  //       }
  //     );
  // }
  getBook(id: string) {
    this.bookService.getBook(id).subscribe(
      (res) => {
        this.book = res;
        // console.log(this.course);

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
  updateBook(id:string,EditbookForm: any) {
    this.submitted = true;
    if (this.EditbookForm.invalid) {
      console.log('form invalid');
    }
    const formdata = new FormData();
    formdata.append('image', this.files, this.files.name);
    formdata.append('name', EditbookForm.value.name);
    formdata.append('category', EditbookForm.value.category);
    formdata.append('author', EditbookForm.value.author);


    this.bookService.updateBook(id,formdata).subscribe(
      (res) => {
        // console.log(res);
        this.router.navigate(['/dashboard/courses']);

      },
      (err) => {
        console.log('Error updating book ');
      }
    );
  }
 
  // getBook(): void {
  //   this.bookService.getBook(this.bookId)
  //     .subscribe(
  //       data => {
  //         this.book = data.book;
  //         this.EditbookForm.setValue({
  //           name: this.book.name,
  //           category: this.book.category,
  //           author: this.book.author,
  //           image: ''
  //         });
  //       },
  //       error => {
  //         console.log('Error fetching book: ', error);
  //       }
  //     );
  // }

  // onSubmit(): void {
    // const bookData = this.EditbookForm.value;
    // const formData = new FormData();
    // formData.append('name', bookData.name);
    // formData.append('category', bookData.category);
    // formData.append('author', bookData.author);
    // if (this.selectedImage) {
    //   formData.append('image', this.selectedImage, this.selectedImage.name);
    // }

    // this.bookService.updateBook(this.bookId, formData)
    //   .subscribe(
    //     data => {
    //       console.log('Book updated successfully!');
    //       console.log(data);
    //       this.EditbookForm.reset();
    //       this.selectedImage = null;
    //       this.errorMessage = '';
    //       this.router.navigate(['/books']);
    //     },
    //     error => {
    //       console.log('Error updating book: ', error);
    //       this.errorMessage = error.message;
    //     }
    //   );

  //   const Book: Book = {
  //     name: this.EditbookForm!.value.name,
  //     category: this.EditbookForm!.value.category,
  //     author: this.EditbookForm!.value.author,
  //     image: '',
  //   };

  //   const formData = new FormData();
  //   formData.append('name', Book.name);
  //   formData.append('category',Book.category!);
  //   formData.append('author', Book.author!);
  //   if (this.selectedImage) {
  //     formData.append('image', this.selectedImage, this.selectedImage.name);
  //   }

  //   const authorId = ''; // Set the author ID to the ID of the author you want to update
  //   this.bookService.updateBook(authorId, formData).subscribe(
  //     (response) => {
  //       console.log(response);
  //       // this.activeModal.close();
  //     },
  //     (error) => {
  //       console.log(error);
  //       this.errorMessage = error.message;
  //     }
  //   );
  // }
  }


  // onImageSelected(event: any): void {
  //   if (event.target.files && event.target.files.length) {
  //     const file = event.target.files[0];
  //     const reader = new FileReader();
  //     reader.readAsDataURL(file);

  //     reader.onload = () => {
  //       this.selectedImage = file;
  //       this.EditbookForm.patchValue({
  //         image: reader.result
  //       });
  //     };
  //   }
  // }
// }
