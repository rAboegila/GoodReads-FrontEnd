import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book, BookDetiles } from 'src/app/_models/Book';
import { BookService } from 'src/app/_services/book.service';
import { Author } from '../../_models/Author';
import { environment } from 'environments/environment.prod';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-book-details-old',
  templateUrl: './book-details-old.component.html',
  styleUrls: ['./book-details-old.component.css']
})
export class BookDetailsOldComponent implements OnInit {
  // url='http://localhost:5000/uploads/books/'
  url = `${environment.url}books/`
  book: BookDetiles = {
    name: '',
    category: {
      _id: '',
      name: '',
    },
    author: {
      _id: '',
      firstName: '',
      lastName: '',
      dob: new Date(),
      image: '',
    },
  };

  constructor(private route: ActivatedRoute, private bookService: BookService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.subscription = this.bookService.getBook(id as string).subscribe(data => {
      this.book = data.data;
      console.log(this.book);

    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
