import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';
import { AuthorsListComponentComponent } from './Admin/authors-list-component/authors-list-component.component';
import { AddAuthorComponent } from './add-author/add-author.component';
import { EditAuthorComponent } from './edit-author/edit-author.component';
import { BookComponent } from './Admin/book/book.component';
import { AddBookComponent } from './Admin/add-book/add-book.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { EditBookComponent1 } from './edit-book/edit-book.component';
import { AdminComponent } from './components/admin/admin.component';
import { GetCategouryComponent } from './landingPage/get-categoury/get-categoury.component';
import { GetCategoryByIdComponent } from './get-category-by-id/get-category-by-id.component';
import { BooksComponent } from './landingPage/books/books.component';
import { UserLibraryComponent } from './user-library/user-library.component';
import { BookShelfComponent } from './components/book-shelf/book-shelf.component';
import { AuthorListComponent } from './author-list/author-list.component';
import { BookDetailsComponent } from './components/book-details/book-details.component';
import { AuthorDetailsComponent } from './components/author-details/author-details.component';
import { AboutUsComponent } from './components/about-us/about-us.component';

const routes: Routes = [
  { path: "", component: HomeComponent, pathMatch: "full" },
  { path: "register", component: RegisterComponent },
  { path: "login", component: LoginComponent },
  { path: "about", component: AboutUsComponent },
  { path: "profile", component: ProfileComponent, canActivate: [AuthGuard] },
  { path: "profile/shelves", component: UserLibraryComponent, canActivate: [AuthGuard] },
  { path: "admin", component: AdminComponent, canActivate: [AdminGuard] },
  { path: 'cate', component: CategoriesComponent, canActivate: [AdminGuard] },
  { path: 'author', component: AuthorsListComponentComponent, canActivate: [AdminGuard] },
  { path: 'admin/add-author', component: AddAuthorComponent, canActivate: [AdminGuard] },
  { path: 'edit-author/:id', component: EditAuthorComponent, canActivate: [AdminGuard] },
  { path: 'Books', component: BookComponent, canActivate: [AdminGuard] },
  { path: 'AddBook', component: AddBookComponent, canActivate: [AdminGuard] },
  { path: 'EditBook/:id', component: EditBookComponent1, canActivate: [AdminGuard] },
  { path: 'showCategory', component: GetCategouryComponent, canActivate: [AuthGuard] },
  { path: 'category/:id', component: GetCategoryByIdComponent, canActivate: [AuthGuard] },
  { path: 'showBooks', component: BooksComponent, canActivate: [AuthGuard] },
  { path: 'showAuthor', component: AuthorListComponent, canActivate: [AuthGuard] },
  { path: 'book-details/:id', component: BookDetailsComponent },
  { path: 'author-details/:id', component: AuthorDetailsComponent, canActivate: [AuthGuard] },
  { path: "**", component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
