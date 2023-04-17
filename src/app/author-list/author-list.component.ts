import { Component } from '@angular/core';
import { AuthorService } from '../_services/author.service';
import { environment } from 'environments/environment.prod';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-author-list',
  templateUrl: './author-list.component.html',
  styleUrls: ['./author-list.component.css']
})
export class AuthorListComponent {
  currentPage = 1;
  searchTerm: string = '';
  private subscription!: Subscription;
  isLoading: boolean = true;
  constructor(private authorService: AuthorService) { }
  authors!: any[]
  url = `${environment.url}authors/`;

  ngOnInit(): void {
    this.subscription = this.authorService.getAuthors()
      .subscribe(data => {
        this.authors = data.data;
        console.log(this.authors);
        this.isLoading = false;
      });
  }

  clearSearchTerm() {
    this.searchTerm = '';
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }

  }
}
