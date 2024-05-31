import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { BlogPostService } from '../services/blog-post.service';
import { BlogPost } from '../Models/blog-post.model';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/Models/category.model';

@Component({
  selector: 'app-edit-blogpost',
  templateUrl: './edit-blogpost.component.html',
  styleUrls: ['./edit-blogpost.component.css']
})
export class EditBlogpostComponent implements OnInit, OnDestroy{
  
  id: string | null = null;
  model?: BlogPost;
  categories$?: Observable<Category[]>;
  selectedCategories?: string[];

  routeSubcription?: Subscription;

  constructor(private route: ActivatedRoute,
    private blogPostService: BlogPostService,
    private categoryService: CategoryService
  ){

  }
 
  
  ngOnInit(): void {

    this.categories$ = this.categoryService.getAllCategories();

    this.routeSubcription  = this.route.paramMap.subscribe({
      next: (params) =>{
        this.id = params.get('id');

        if(this.id){
          this.blogPostService.getBlogPostById(this.id).subscribe({
            next: (response) => {
              this.model = response;
              this.selectedCategories = response.categories.map(x => x.id.toString());
            }
          })
        }
      }
    })
  }

  onFormSubmit(){

  }

  ngOnDestroy(): void {
    this.routeSubcription?.unsubscribe();
  }

}
