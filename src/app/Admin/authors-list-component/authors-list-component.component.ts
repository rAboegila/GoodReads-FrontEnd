import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Author } from 'src/app/_models/Author';
import { AuthorService } from 'src/app/_services/author.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { environment } from 'environments/environment.prod';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-authors-list-component',
  templateUrl: './authors-list-component.component.html',
  styleUrls: ['./authors-list-component.component.css']
})
export class AuthorsListComponentComponent implements OnInit {
  currentPage = 1;
  private subscription!: Subscription;
  private subscription2!: Subscription;
  authors: Author[] = [];
  url = `${environment.url}authors/`
  isLoading: boolean = true;

  constructor(private authorService: AuthorService, private router: Router) { }

  ngOnInit(): void {
    this.getAuthors();
  }

  onEditClick(id: string) {
    this.router.navigate(['edit-author', id]);
  }

  getAuthors(): void {
    this.subscription2 = this.authorService.getAuthors().subscribe((response) => {
      if (response.success) {
        this.authors = response.data;
        this.isLoading = false;

      }
    });
  }


  deleteAuthor(_id: string): void {
    console.log(_id);
    this.subscription = this.authorService.deleteAuthor(_id).subscribe((response) => {
      if (response.success) {
        this.getAuthors();
      }
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.subscription2) {
      this.subscription2.unsubscribe();
    }
  }
}
