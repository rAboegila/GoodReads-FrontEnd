import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Author } from 'src/app/_models/Author';
import { AuthorService } from 'src/app/_services/author.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthorDialogComponent } from '../author-dialog/author-dialog.component';
import { Router } from '@angular/router';
import { environment } from 'environments/environment.prod';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-authors-list-component',
  templateUrl: './authors-list-component.component.html',
  styleUrls: ['./authors-list-component.component.css']
})
export class AuthorsListComponentComponent implements OnInit
  {
    currentPage = 1;
    private subscription!: Subscription ;

    authors: Author[] = [];
    // url='http://localhost:5000/uploads/authors/'
    url=`${environment.url}authors/`

    constructor(private authorService: AuthorService, private router: Router) {}

    ngOnInit(): void {
      this.getAuthors();
    }

    onEditClick(id: string) {
      this.router.navigate(['edit-author', id]);
    }

    getAuthors(): void {
      this.authorService.getAuthors().subscribe((response) => {
        if (response.success) {
          this.authors = response.data;
        }
      });
    }

    openAddAuthorModal(): void {
      // Open Add Author modal admin/edit-auhtor/:id
    }

    openEditAuthorModal(author: Author): void {
      // Open Edit Author modal
    }

    deleteAuthor(_id: string): void {
      console.log(_id);
      this.subscription=this.authorService.deleteAuthor(_id).subscribe((response) => {
        if (response.success) {
          this.getAuthors();
        }
      });
    }

    ngOnDestroy() {
      if (this.subscription) {
        this.subscription.unsubscribe();
      }
    }
  }
