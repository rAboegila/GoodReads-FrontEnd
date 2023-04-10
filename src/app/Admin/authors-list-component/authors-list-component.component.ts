import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Author } from 'src/app/_models/Author';
import { AuthorService } from 'src/app/_services/author.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthorDialogComponent } from '../author-dialog/author-dialog.component';

@Component({
  selector: 'app-authors-list-component',
  templateUrl: './authors-list-component.component.html',
  styleUrls: ['./authors-list-component.component.css']
})
export class AuthorsListComponentComponent implements OnInit 
  {
    authors: Author[] = [];
    url='http://localhost:5000/uploads/authors/'

    constructor(private authorService: AuthorService) {}
  
    ngOnInit(): void {
      this.getAuthors();
    }
  
    getAuthors(): void {
      this.authorService.getAuthors().subscribe((response) => {
        if (response.success) {
          this.authors = response.data;
        }
      });
    }
  
    openAddAuthorModal(): void {
      // Open Add Author modal
    }
  
    openEditAuthorModal(author: Author): void {
      // Open Edit Author modal
    }
  
    deleteAuthor(id: string): void {
      this.authorService.deleteAuthor(id).subscribe((response) => {
        if (response.success) {
          this.getAuthors();
        }
      });
    }
  }