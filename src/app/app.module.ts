import { NgModule } from '@angular/core';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CategoriesComponent } from './categories/categories.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { AppComponent } from './app.component';
import { MatSelectModule } from '@angular/material/select';
import { BookComponent } from './Admin/book/book.component';
import { BookDialogComponent } from './book-dialog/book-dialog.component';
import { AuthorsListComponentComponent } from './Admin/authors-list-component/authors-list-component.component';
import { AuthorDialogComponent } from './Admin/author-dialog/author-dialog.component';
import { AddAuthorComponent } from './add-author/add-author.component';
import { EditAuthorComponent } from './edit-author/edit-author.component';
import { AddBookComponent } from './Admin/add-book/add-book.component';
import {  EditBookComponent1 } from './edit-book/edit-book.component';
@NgModule({
  declarations: [
    AppComponent,
    CategoriesComponent,
    BookComponent,
    BookDialogComponent,
    AuthorsListComponentComponent,
    AuthorDialogComponent,
    AddAuthorComponent,
    EditAuthorComponent,
    AddBookComponent,
    EditBookComponent1
  ],
  imports: [
    NgbModule, // add NgbModule to the imports array
    MatDatepickerModule,
    MatNativeDateModule,
    MatDatepickerModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatSelectModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatSnackBarModule,
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  // providers: [],
  providers: [NgbActiveModal],
  bootstrap: [AppComponent],
  entryComponents: [BookDialogComponent]
})
export class AppModule { }
