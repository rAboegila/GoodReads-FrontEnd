import { Component } from '@angular/core';
import { AuthorService } from '../_services/author.service';
import { environment } from 'environments/environment.prod';

@Component({
  selector: 'app-author-list',
  templateUrl: './author-list.component.html',
  styleUrls: ['./author-list.component.css']
})
export class AuthorListComponent {
  constructor(private authorService: AuthorService) { }
  authors: any[] | undefined;
  url=`${environment.url}authors/`;
  currentPage = 1;

  ngOnInit(): void {
    this.authorService.getAuthors()
      .subscribe(data => {
        this.authors = data.data;
        console.log(this.authors);

      });
  }
}
