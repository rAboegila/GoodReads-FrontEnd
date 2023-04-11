// import { Component, Inject } from '@angular/core';
// import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { Author } from 'src/app/_models/Author';

// @Component({
//   selector: 'app-author-dialog',
//   templateUrl: './author-dialog.component.html',
//   styleUrls: ['./author-dialog.component.css']
// })
// export class AuthorDialogComponent{
//   form!: FormGroup;
// lastName: any;
// firstName: any;
// dob: any;

// constructor(
//   private fb: FormBuilder,
//   public dialogRef: MatDialogRef<AuthorDialogComponent>,
//   @Inject(MAT_DIALOG_DATA) public data: Author
// ) {
//   this.createForm();
// }
// createForm() {
//   this.form = this.fb.group({
//     image: [this.data.image],
//     firstName: [this.data.firstName, Validators.required],
//     lastName: [this.data.lastName, Validators.required],
//     dob: [this.data.dob, Validators.required]
//   });
// }

// onNoClick(): void {
//   if (this.dialogRef && this.dialogRef['_'].componentInstance.invalid ) {
//     // Do something
//   }
//   this.dialogRef.close();
// }



// onSaveClick(): void {
//   const author: Author = {
//     _id: this.data._id,
//     ...this.form.value
//   };
//   this.dialogRef.close(author);
// }

// getErrorMessage(controlName: string) {
//   if (this.form.controls[controlName].hasError('required')) {
//     return `You must enter a ${controlName}`;
//   }
//   return '';
// }
// getFirstNameErrorMessage() {
//   if (this.form.controls['firstName'].hasError('required')) {
//     return 'You must enter a first name';
//   }
//   return '';
// }

// getDobErrorMessage() {
//   if (this.form.controls['dob'].hasError('required')) {
//     return 'You must enter a date of birth';
//   }
//   return '';
// }

// getLastNameErrorMessage() {
//   if (this.form.controls['lastName'].hasError('required')) {
//     return 'You must enter a last name';
//   }
//   return '';
// }



// }


// // 

// import { Component, Inject } from '@angular/core';
// import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { Author } from 'src/app/_models/Author';

// @Component({
//   selector: 'app-author-dialog',
//   templateUrl: './author-dialog.component.html',
//   styleUrls: ['./author-dialog.component.css']
// })
// export class AuthorDialogComponent{
//   form!: FormGroup;
// lastName: any;
// firstName: any;
// dob: any;

// constructor(
//   private fb: FormBuilder,
//   public dialogRef: MatDialogRef<AuthorDialogComponent>,
//   @Inject(MAT_DIALOG_DATA) public data: Author
// ) {
//   this.createForm();
// }
// createForm() {
//   this.form = this.fb.group({
//     image: [this.data.image],
//     firstName: [this.data.firstName, Validators.required],
//     lastName: [this.data.lastName, Validators.required],
//     dob: [this.data.dob, Validators.required]
//   });
// }

// onNoClick(): void {
//   this.dialogRef.close();
// }

// onSaveClick(): void {
//   const author: Author = {
//     _id: this.data._id,
//     ...this.form.value
//   };
//   this.dialogRef.close(author);
// }

// getErrorMessage(controlName: string) {
//   if (this.form.controls[controlName].hasError('required')) {
//     return `You must enter a ${controlName}`;
//   }
//   return '';
// }
// getFirstNameErrorMessage() {
//   if (this.form.controls['firstName'].hasError('required')) {
//     return 'You must enter a first name';
//   }
//   return '';
// }

// getDobErrorMessage() {
//   if (this.form.controls['dob'].hasError('required')) {
//     return 'You must enter a date of birth';
//   }
//   return '';
// }

// getLastNameErrorMessage() {
//   if (this.form.controls['lastName'].hasError('required')) {
//     return 'You must enter a last name';
//   }
//   return '';
// }



// }
// // 


// <div class="container">
//   <h1>Authors List</h1>
//   <button mat-raised-button color="primary" (click)="openAuthorDialog()">Add Author</button>
//   <table mat-table [dataSource]="authors">
//     <ng-container matColumnDef="image">
//       <th mat-header-cell *matHeaderCellDef>Image</th>
//       <td mat-cell *matCellDef="let author">
//         <img *ngIf="author.image" [src]="url+author.image" alt="Author Image" class="author-image">
//         <span *ngIf="!author.image">No image available</span>
//       </td>

//     </ng-container>


//     <ng-container matColumnDef="name">
//       <th mat-header-cell *matHeaderCellDef>Name</th>
//       <td mat-cell *matCellDef="let author">{{ author.firstName }} {{ author.lastName }}</td>
//     </ng-container>
//     <ng-container matColumnDef="dob">
//       <th mat-header-cell *matHeaderCellDef>Date of Birth</th>
//       <td mat-cell *matCellDef="let author">{{ author.dob | date:'dd/MM/yyyy' }}</td>
//     </ng-container>
//     <ng-container matColumnDef="actions">
//       <th mat-header-cell *matHeaderCellDef>Actions</th>
//       <td mat-cell *matCellDef="let author">
//         <button mat-icon-button color="primary" (click)="openAuthorDialog(author)">
//           <mat-icon>edit</mat-icon>
//         </button>
//         <button mat-icon-button color="warn" (click)="deleteAuthor(author)">
//           <mat-icon>delete</mat-icon>
//         </button>
//       </td>
//     </ng-container>
//     <tr mat-header-row *matHeaderRowDef="['image', 'name', 'dob', 'actions']"></tr>
//     <tr mat-row *matRowDef="let author; columns: ['image', 'name', 'dob', 'actions']"></tr>
//   </table>
// </div>
// <img width="1000" height="300" src="http://localhost:5000/uploads/authors/photo_profile_1680396412273.png" alt="">
// <!-- <img src="http://localhost:5000/public/default.png" alt="Profile Image"> -->
// {/*  */}


// import { Component, OnInit } from '@angular/core';
// import { MatDialog } from '@angular/material/dialog';
// import { MatSnackBar } from '@angular/material/snack-bar';
// import { Author } from 'src/app/_models/Author';
// import { AuthorService } from 'src/app/_services/author.service';
// import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
// import { AuthorDialogComponent } from '../author-dialog/author-dialog.component';

// @Component({
//   selector: 'app-authors-list-component',
//   templateUrl: './authors-list-component.component.html',
//   styleUrls: ['./authors-list-component.component.css']
// })
// export class AuthorsListComponentComponent implements OnInit {
//   authors: Author[] = [];
//   url='http://localhost:5000/uploads/authors/'
//   // http://localhost:5000/public/uploads/authors/photo_profile_1680396412273.png
//   // url = !environment.production ? 'https://localhost:5000/public/uploads/authors/' : 'http://localhost:5000/public/uploads/authors/';

//   constructor(private authorService: AuthorService, public dialog: MatDialog, private snackBar: MatSnackBar) { }

//   ngOnInit(): void {
//     this.authorService.getAuthors().subscribe(
//       (res) => {
//         this.authors = res.data;
//       },
//       (err) => {
//         console.error(err);
//       }
//     );
//   }


//   openAuthorDialog(author?: Author): void {
//     const dialogRef = this.dialog.open(AuthorDialogComponent, {
//       width: '500px',
//       data: author ? { ...author } : {}
//     });

//     dialogRef.afterClosed().subscribe(result => {
//       if (result) {
//         if (result._id) {
//           this.authorService.updateAuthor(result._id, result).subscribe(
//             (res) => {
//               this.snackBar.open('Author updated successfully', '', {
//                 duration: 2000
//               });
//               const index = this.authors.findIndex((a) => a._id === result._id);
//               this.authors[index] = result;
//             },
//             (err) => {
//               console.error(err);
//             }
//           );
//         } else {
//           this.authorService.createAuthor(result).subscribe(
//             (res) => {
//               this.snackBar.open('Author created successfully', '', {
//                 duration: 2000
//               });
//               this.authors.push(res.data);
//             },
//             (err) => {
//               console.error(err);
//             }
//           );
//         }
//       }
//     });
//   }

//   deleteAuthor(author: Author): void {
//     if (confirm(`Are you sure you want to delete ${author.firstName} ${author.lastName}?`)) {
//       this.authorService.deleteAuthor(author._id as string).subscribe(
//         (res) => {
//           this.snackBar.open('Author deleted successfully', '', {
//             duration: 2000
//           });
//           const index = this.authors.findIndex((a) => a._id === author._id);
//           this.authors.splice(index, 1);
//         },
//         (err) => {
//           console.error(err);
//         }
//       );
//     }
//   }

// }
// {/*  */}
// import { Injectable } from '@angular/core';
// import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
// import { Observable, throwError } from 'rxjs';
// import { catchError } from 'rxjs/operators';
// import { Author } from '../_models/Author';
// @Injectable({
//   providedIn: 'root'
// })
// export class AuthorService  {

//   private url = 'http://localhost:5000/api/authors';

//   constructor(private http: HttpClient) { }

//   getAuthors(): Observable<any> {
//      const headers = new HttpHeaders({
//       Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MzI5ZjYxMmY1MGViM2I3ZjExYzY4OCIsImlhdCI6MTY4MTA1NDE3OSwiZXhwIjoxNjgzNjQ2MTc5fQ.95SfHY-6vnjQX_EpMyhw2Ry_5ZNHslAo9_VTOY_A14A',
//     });
//     return this.http.get<any>(this.url,{
//       headers
//     });
//   }

//   getAuthor(id: string): Observable<any> {
//     return this.http.get<any>(`${this.url}/${id}`);
//   }

//   createAuthor(author: Author): Observable<any> {
//     return this.http.post<any>(this.url, author);
//   }

//   updateAuthor(id: string, author: Author): Observable<any> {
//     return this.http.put<any>(`${this.url}/${id}`, author);
//   }

//   deleteAuthor(id: string): Observable<any> {
//     return this.http.delete<any>(`${this.url}/${id}`);
//   }
// }



