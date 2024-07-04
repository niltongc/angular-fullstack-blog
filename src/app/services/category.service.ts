import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddCategoryRequest } from '../Models/add-category-request.model';
import { Category } from '../Models/category.model';
import { environment } from 'src/environments/environment';
import { UpdateCategoryRequest } from '../Models/update-category-request.model';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  
  // https://localhost:7120/api/Categories

  constructor(private http: HttpClient,
    private cookieService: CookieService
  ) { }

  addCategory(model: AddCategoryRequest): Observable<void> {
    return this.http.post<void>(`${environment.apiBaseUrl}/api/Categories?addAuth=true`, model)
  }

  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${environment.apiBaseUrl}/api/Categories`);
  }

  getCategoryById(id: string): Observable<Category> {
    return this.http.get<Category>(`${environment.apiBaseUrl}/api/categories/${id}`)
  }

  updateCategory(id: string, updateCaegoryRequest: UpdateCategoryRequest): 
  Observable<Category>{
    return this.http.put<Category>(`${environment.apiBaseUrl}/api/categories/${id}?addAuth=true`,
      updateCaegoryRequest)
  }

  deleteCategory(id: string) : Observable<Category>{
    return this.http.delete<Category>(`${environment.apiBaseUrl}/api/categories/${id}?addAuth=true`)
  }



}
