import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';
import { AuthorsListComponentComponent } from './Admin/authors-list-component/authors-list-component.component';
import { AddAuthorComponent } from './add-author/add-author.component';
import { EditAuthorComponent } from './edit-author/edit-author.component';
import { BookComponent } from './Admin/book/book.component';
import { AddBookComponent } from './Admin/add-book/add-book.component';
import { EditBookComponent1 } from './edit-book/edit-book.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminComponent } from './components/admin/admin.component';
import { AdminGuard } from './guards/admin.guard';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { SingleBookComponent } from './components/single-book/single-book.component';
import { BookShelfComponent } from './book-shelf/book-shelf.component';
import { ShelfItemComponent } from './components/shelf-item/shelf-item.component';

const routes: Routes = [
  { path: "", component: HomeComponent, pathMatch: "full" },
  { path: "register", component: RegisterComponent },
  { path: "login", component: LoginComponent },
  { path: "profile", component: ProfileComponent, canActivate: [AuthGuard] },
  { path: "profile/shelves", component: BookShelfComponent, canActivate: [AuthGuard] },
  { path: "admin", component: AdminComponent, canActivate: [AdminGuard] },
  { path: 'Category', component: CategoriesComponent },
  { path: 'auhtor', component: AuthorsListComponentComponent },
  { path: 'Addauhtor', component: AddAuthorComponent },
  { path: 'EditAuhtor/:id', component: EditAuthorComponent },
  { path: 'Books', component: BookComponent },
  { path: 'books/:id', component: SingleBookComponent },
  { path: 'AddBook', component: AddBookComponent },
  { path: 'aboutus', component: AboutusComponent },
  { path: 'auhtor', component: AuthorsListComponentComponent, canActivate: [AdminGuard] },
  { path: 'Addauhtor', component: AddAuthorComponent },
  { path: 'EditAuhtor/:id', component: EditAuthorComponent },
  { path: 'Books', component: BookComponent },
  { path: 'AddBook', component: AddBookComponent },
  { path: 'EditBook/:id', component: EditBookComponent1, canActivate: [AdminGuard] },
  { path: "**", component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
