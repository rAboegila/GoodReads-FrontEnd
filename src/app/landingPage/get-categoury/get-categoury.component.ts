import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/_models/Category';
import { CategoryService } from 'src/app/_services/category.service';

@Component({
  selector: 'app-get-categoury',
  templateUrl: './get-categoury.component.html',
  styleUrls: ['./get-categoury.component.css']
})
export class GetCategouryComponent implements OnInit {
  categories: Category[] | undefined;
  searchTerm: string = '';
  private subscription!: Subscription;
  isLoading: boolean = true;

  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    this.subscription = this.categoryService.getCategories().subscribe(data => {
      this.categories = data.data;
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
