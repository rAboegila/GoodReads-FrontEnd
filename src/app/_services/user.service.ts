import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { User } from '../_models/User';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseUrl } from './helper';
import { BookShelf } from '../_models/Book';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject: BehaviorSubject<User | null>;
  public user: Observable<User | null>;
  public myUser: User | any;

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
    this.user = this.userSubject.asObservable();
  }

  public get userValue() {
    return this.userSubject.value;
  }

  login(username: string, password: string) {
    return this.http.post<User>(`${baseUrl}/api/auth/login`, { username, password })
      .pipe(map(user => {
        // console.log("user: ", user);
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('user', JSON.stringify(user));
        this.userSubject.next(user);
        return user;
      }));
  }

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate(['/login']);
  }

  register(user: FormData) {
    return this.http.post<User>(`${baseUrl}/api/auth/register`, user)
      .pipe(map(user => {
        localStorage.setItem('user', JSON.stringify(user));
        this.userSubject.next(user);
        return user;
      }));
  }

  getProfile(): Observable<any> {
    return this.http.get<User>(`${baseUrl}/api/auth/me`);
  }

  updateLibrary(bookID: string, updatedShelf: BookShelf, updatedRating: number) {

    const headers = new HttpHeaders({
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MzlhY2JlNjUyZTU4ODRkNTlkNGQ1OSIsImlhdCI6MTY4MTUxODMzNCwiZXhwIjoxNjg0MTEwMzM0fQ.SwLSyeq61rhmaNSLNurpwXuTs9e2arF0JCvRiDmLc1A',
    });
    // return this.http.get<User>(`${baseUrl}/user/${bookID}/book`, {updatedShelf, updatedRating})
    return this.http.put<User>(`${baseUrl}/api/user/${bookID}/book`, { shelve: updatedShelf, rating: updatedRating },{
      headers
    })
      .pipe(map(res => {
        this.userSubject.next(res.data);

        if (localStorage.getItem('user')) {
          const data: any = localStorage.getItem('user');
          const token = JSON.parse(data).token;
          const success = JSON.parse(data).success;
          res.data.success = success;
          res.data.token = token;
        }
        localStorage.setItem('user', JSON.stringify(res.data));
        return res;
      }));


  }
}
