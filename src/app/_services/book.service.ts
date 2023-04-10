import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../_models/Book';
@Injectable({
  providedIn: 'root'
})
export class BookService  {

  private apiUrl = 'http://localhost:5000/api/books';

  constructor(private http: HttpClient) { }

  getBooks(page: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?page=${page}`);
  }

  getBook(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createBook(book: FormData): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MzI5YmE2YzY0MDBmMzc0NzVmNDEwOSIsImlhdCI6MTY4MTA4NTY1NywiZXhwIjoxNjgzNjc3NjU3fQ.A8T54Y__MVpmCEFpqeMF5ILSPzT3XrP1Oee4Y-H6RzA',
    });
    return this.http.post<any>(`${this.apiUrl}`, book,{
      headers
    });
  }

  updateBook(id: string, book: FormData): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MzI5YmE2YzY0MDBmMzc0NzVmNDEwOSIsImlhdCI6MTY4MTA4NTY1NywiZXhwIjoxNjgzNjc3NjU3fQ.A8T54Y__MVpmCEFpqeMF5ILSPzT3XrP1Oee4Y-H6RzA',
    });
    return this.http.put<any>(`${this.apiUrl}/${id}`, book,{
      headers
    });
  }

  deleteBook(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
