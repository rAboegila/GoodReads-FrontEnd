import { NgModule } from '@angular/core';
import { NgbActiveModal, NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
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
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AdminComponent } from './components/admin/admin.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { JwtInterceptor } from './interceptors/jwt.interceptor';

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
import { GetCategouryComponent } from './landingPage/get-categoury/get-categoury.component';
import { GetCategoryByIdComponent } from './get-category-by-id/get-category-by-id.component';
import { BooksComponent } from './landingPage/books/books.component';
import { BookDetailsComponent } from './landingPage/book-details/book-details.component';
import { NgxPaginationModule } from 'ngx-pagination';

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
    EditBookComponent1,
    LoginComponent,
    NavbarComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    AdminComponent,
    NotFoundComponent,
    GetCategouryComponent,
    GetCategoryByIdComponent,
    BooksComponent,
    BookDetailsComponent
  ],
  imports: [
    NgbModule, // add NgbModule to the imports array
    MatDatepickerModule,
    NgxPaginationModule,
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
    NgbModalModule,
    AppRoutingModule,
    BrowserAnimationsModule,
        FormsModule,
    HttpClientModule,
    ReactiveFormsModule,

  ],

  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
  // entryComponents: [BookDialogComponent],

})
export class AppModule { }
