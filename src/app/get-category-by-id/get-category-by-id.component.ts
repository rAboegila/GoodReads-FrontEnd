import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from '../_services/category.service';
import { Category } from '../_models/Category';
@Component({
  selector: 'app-get-category-by-id',
  templateUrl: './get-category-by-id.component.html',
  styleUrls: ['./get-category-by-id.component.css']
})
export class GetCategoryByIdComponent implements OnInit {
  category: Category | undefined;

  constructor(private route: ActivatedRoute, private categoryService: CategoryService) { }

  ngOnInit() {
    const categoryId = this.route.snapshot.params['id'];
    this.categoryService.getCategory(categoryId).subscribe(data => {
      this.category = data;
    });
  }

}
