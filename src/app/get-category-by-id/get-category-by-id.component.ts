import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from '../_services/category.service';
import { Category } from '../_models/Category';
import { environment } from 'environments/environment.prod';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-get-category-by-id',
  templateUrl: './get-category-by-id.component.html',
  styleUrls: ['./get-category-by-id.component.css']
})
export class GetCategoryByIdComponent implements OnInit {
  category: Category | undefined;
  books: any[] = [];
  subscriptions: Subscription[] =[];
  url=`${environment.url}books/`

  constructor(private route: ActivatedRoute, private categoryService: CategoryService) { }

  ngOnInit() {
    const categoryId = this.route.snapshot.params['id'];
    this.subscriptions.push(this.categoryService.getCategory(categoryId).subscribe(data => {
      this.category = data.data;
    }));

    this.subscriptions.push(this.categoryService.getBookCategory(categoryId).subscribe(data => {
      this.books = data.data;      
    }));
    
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
