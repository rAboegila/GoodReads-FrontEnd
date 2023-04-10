import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';
import { AuthorsListComponentComponent } from './Admin/authors-list-component/authors-list-component.component';
import { AddAuthorComponent } from './add-author/add-author.component';
import { EditAuthorComponent } from './edit-author/edit-author.component';
import { BookComponent } from './Admin/book/book.component';
import { AddBookComponent } from './Admin/add-book/add-book.component';
import { EditBookComponent1 } from './edit-book/edit-book.component';

const routes: Routes = [
  { path: 'Category', component:CategoriesComponent},
  {path: 'auhtor', component:AuthorsListComponentComponent},
  {path: 'Addauhtor', component:AddAuthorComponent},
  {path: 'EditAuhtor/:id', component:EditAuthorComponent},
  {path: 'Books', component:BookComponent},
  {path: 'AddBook', component:AddBookComponent},

  {path: 'EditBook/:id', component:EditBookComponent1},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
