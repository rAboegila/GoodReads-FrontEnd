import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book } from 'src/app/_models/Book';
import { BookService } from 'src/app/_services/book.service';
import { uploadsUrl } from 'src/app/_services/helper';

@Component({
  selector: 'app-single-book',
  templateUrl: './single-book.component.html',
  styleUrls: ['./single-book.component.css']
})
export class SingleBookComponent {

  id: string = '';
  book: any = {};
  bookImage: string = '';

  constructor(private _bookService: BookService, private _activatedRoute: ActivatedRoute) { 

    this.id = this._activatedRoute.snapshot.params['id'];
  
    this._bookService.getBook(this.id).subscribe({
      next: (res) => {
        console.log(res.data);
        this.book = res.data;

        this.bookImage = `${uploadsUrl}/books/${this.book?.image}` || '';

        // this._router.navigate(['/']);

      },
      error: error => {
        console.log(error);
      }
    });
  }

}
