import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from './helper';
import { environment } from 'environments/environment.prod';
@Injectable({
  providedIn: 'root'
})
export class BookService {

  private apiUrl = `${environment.baseUrl}/books`;

  constructor(private http: HttpClient) { }

  getBooks(page: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?page=${page}`);
  }

  getBook(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createBook(book: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, book);
  }

  updateBook(id: string, book: FormData): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, book);
  }

  deleteBook(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  getPopularBooks(): Observable<any> {
    return this.http.get<any>(`${baseUrl}/api/authors/popular/books/popular`);
  }
}
