import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book, BookDetiles } from 'src/app/_models/Book';
import { BookService } from 'src/app/_services/book.service';
import { Author } from '../../_models/Author';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {
  url='http://localhost:5000/uploads/books/'

  book: BookDetiles= {
    name: '',
    category: {
      _id:'',
      name:'',
    },
    author:{
      _id:'',
      firstName: '',
      lastName: '',
      dob: new Date(),
      image: '',
    },
  };

  constructor(private route: ActivatedRoute, private bookService: BookService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.bookService.getBook(id as string).subscribe(data => {
      this.book = data.data;
      console.log(this.book);
      
    });
  }

}
