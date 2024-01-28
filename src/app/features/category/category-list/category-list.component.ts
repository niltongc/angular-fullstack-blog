import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from 'src/app/Models/category.model';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent {

  // categories?: Category[];

  categories$?: Observable<Category[]>;

  constructor(private categoryService: CategoryService) {

  }

  ngOnInit(): void{
    this.categories$ = this.categoryService.getAllCategories();
  }

  // ngOnInit():void{
  //   this.categoryService.getAllCategories()
  //   .subscribe({
  //     next: (response) => {
  //       this.categories = response;
  //     }
  //   })
  // }
}
