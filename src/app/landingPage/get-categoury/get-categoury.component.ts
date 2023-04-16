import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/_models/Category';
import { CategoryService } from 'src/app/_services/category.service';

@Component({
  selector: 'app-get-categoury',
  templateUrl: './get-categoury.component.html',
  styleUrls: ['./get-categoury.component.css']
})
export class GetCategouryComponent implements OnInit {
  categories: Category[] | undefined;
  searchTerm: string ='';


  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    this.categoryService.getCategories().subscribe(data => {
      this.categories = data.data;
    });
  }
  clearSearchTerm() {
    this.searchTerm = '';
  }
}
