import { Injectable } from '@angular/core';
import { Category } from '../_models/Category';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { baseUrl } from './helper';
import { environment } from 'environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  // private apiUrl = 'http://localhost:5000/api/categories';

  private apiUrl = `${environment.baseUrl}/categories`;

  constructor(private http: HttpClient) { }

  getCategories(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  getCategory(categoryId: string): Observable<any> {
    const url = `${this.apiUrl}/${categoryId}`;
    return this.http.get<any>(url);
  }

  addCategory(category: Category): Observable<any> {
    return this.http.post<any>(this.apiUrl, category);
  }

  updateCategory(categoryId: string, category: Category): Observable<any> {
    const url = `${this.apiUrl}/${categoryId}`;
    return this.http.put<any>(url, category);
  }

  deleteCategory(categoryId: string): Observable<any> {
    const url = `${this.apiUrl}/${categoryId}`;
    return this.http.delete<any>(url);
  }

  getPopularCategory(): Observable<any> {
    return this.http.get<any>(`${baseUrl}/categories/popular`);
  }
}
