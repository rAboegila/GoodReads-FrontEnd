import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Author } from '../_models/Author';
import { baseUrl } from './helper';
import { environment } from 'environments/environment.prod';
import { Book } from '../_models/Book';
@Injectable({
  providedIn: 'root'
})
export class AuthorService  {

  private url = 'http://localhost:5000/api/authors';

    // private API_URL = 'http://localhost:5000/api';

    private API_URL = environment.baseUrl;

    constructor(private http: HttpClient) {}
    getAuthors(): Observable<any> {
    //  const headers = new HttpHeaders({
    //   Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MzI5YmE2YzY0MDBmMzc0NzVmNDEwOSIsImlhdCI6MTY4MTA4NTY1NywiZXhwIjoxNjgzNjc3NjU3fQ.A8T54Y__MVpmCEFpqeMF5ILSPzT3XrP1Oee4Y-H6RzA',
    // });
    return this.http.get<any>(`${this.API_URL}/authors`)
  }
    // getAuthors(): Observable<any> {
    //   return this.http.get(`${this.API_URL}/authors`);
    // }

    getAuthorById(id: string): Observable<any> {
      return this.http.get(`${this.API_URL}/authors/${id}`);
    }

    createAuthor(formData: FormData): Observable<any> {
      //   const headers = new HttpHeaders({
      //    Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MzI5YmE2YzY0MDBmMzc0NzVmNDEwOSIsImlhdCI6MTY4MTA4NTY1NywiZXhwIjoxNjgzNjc3NjU3fQ.A8T54Y__MVpmCEFpqeMF5ILSPzT3XrP1Oee4Y-H6RzA',
      //  });
      return this.http.post(`${this.API_URL}/authors`, formData,)
    }

    updateAuthor(id: string, formData: FormData): Observable<any> {
      return this.http.put(`${this.API_URL}/authors/${id}`, formData);
    }

    deleteAuthor(id: string): Observable<any> {
      // const headers = new HttpHeaders({
      //   Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MzI5YmE2YzY0MDBmMzc0NzVmNDEwOSIsImlhdCI6MTY4MTA4NTY1NywiZXhwIjoxNjgzNjc3NjU3fQ.A8T54Y__MVpmCEFpqeMF5ILSPzT3XrP1Oee4Y-H6RzA',
      // });
      console.log(id);
      return this.http.delete(`${this.API_URL}/authors/${id}`)
    }

    getAuthorBooks(id: string): Observable<any> {
      return this.http.get<any>(`${this.API_URL}/authors/${id}/books`);
    }
  }
