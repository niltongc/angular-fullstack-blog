import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { BlogPostService } from '../services/blog-post.service';
import { BlogPost } from '../Models/blog-post.model';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/Models/category.model';
import { UpdateBlogPost } from '../Models/update-blog-post.models';
import { ImageService } from 'src/app/shared/components/image-selector/image.service';

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
  isImageSelectorVisible: boolean = false;

  routeSubcription?: Subscription;
  updateBlogPostSubscription?:Subscription;
  getBlogPostSubscription?:Subscription;
  deleteBlogPostSubscription?:Subscription;
  imageSelectSubscription?: Subscription;
  


  constructor(private route: ActivatedRoute,
    private blogPostService: BlogPostService,
    private categoryService: CategoryService,
    private router:Router,
    private imageService: ImageService
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

        this.imageSelectSubscription = this.imageService.onSelectImage()
        .subscribe({
          next: (response) => {
            if(this.model){
              this.model.featuredImageUrl = response.url;
              this.isImageSelectorVisible = false;
            }
          }
        })
      }
    })
  }

  onFormSubmit(){
    if(this.model && this.id){
      let updateBlogPost: UpdateBlogPost = {
        author: this.model.author,
        content: this.model.content,
        shortDescription: this.model.shortDescription,
        featuredImageUrl: this.model.featuredImageUrl,
        isVisible: this.model.isVisible,
        publishedDate: this.model.publishedDate,
        title: this.model.title,
        urlHandle: this.model.urlHandle,
        categories: this.selectedCategories ?? []
      };

      this.updateBlogPostSubscription = this.blogPostService.updateBlogPost(this.id,updateBlogPost)
      .subscribe({
        next:(response) => {
          this.router.navigateByUrl('/admin/blogposts');
        }
      });
    }
  }

  onDelete():void{
    if(this.id){
      this.deleteBlogPostSubscription = this.blogPostService.deleteBlogPost(this.id)
      .subscribe({
        next:(response) => {
          this.router.navigateByUrl('/admin/blogposts')
        }
      })
    }
  }

  openImageSelector():void{
    this.isImageSelectorVisible = true;
  }
  closeImageSelector(){
    this.isImageSelectorVisible = false;
  }

  ngOnDestroy(): void {
    this.routeSubcription?.unsubscribe();
    this.updateBlogPostSubscription?.unsubscribe();
    this.getBlogPostSubscription?.unsubscribe();
    this.deleteBlogPostSubscription?.unsubscribe();
    this.imageSelectSubscription?.unsubscribe();
  }

}
