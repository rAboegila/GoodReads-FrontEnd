import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment.prod';
@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  private API_URL = environment.baseUrl;

  constructor(private http: HttpClient) { }
  getAuthors(): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/authors`)
  }

  getAuthorById(id: string): Observable<any> {
    return this.http.get(`${this.API_URL}/authors/${id}`);
  }

  createAuthor(formData: FormData): Observable<any> {
    return this.http.post(`${this.API_URL}/authors`, formData,)
  }

  updateAuthor(id: string, formData: FormData): Observable<any> {
    return this.http.put(`${this.API_URL}/authors/${id}`, formData);
  }

  deleteAuthor(id: string): Observable<any> {
    return this.http.delete(`${this.API_URL}/authors/${id}`)
  }

  getAuthorBooks(id: string): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/authors/${id}/books`);
  }
}
