import { Component } from '@angular/core';
import { AuthorService } from '../_services/author.service';
import { environment } from 'environments/environment.prod';

@Component({
  selector: 'app-author-list',
  templateUrl: './author-list.component.html',
  styleUrls: ['./author-list.component.css']
})
export class AuthorListComponent {
  currentPage = 1;

  constructor(private authorService: AuthorService) { }
  authors: any[] | undefined;
  url=`${environment.url}authors/`;

  ngOnInit(): void {
    this.authorService.getAuthors()
      .subscribe(data => {
        this.authors = data.data;
        console.log(this.authors);

      });
  }
}
