import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { User } from '../_models/User';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
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
    return this.http.post<User>(`${baseUrl}/auth/login`, { username, password })
      .pipe(map(res => {
        localStorage.setItem('user', JSON.stringify(res));
        this.userSubject.next(res);
        return res;
      }));
  }

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate(['/login']);
  }

  register(user: any) {
    return this.http.post<any>(`${baseUrl}/auth/register`, user)
      .pipe(map(user => {
        localStorage.setItem('user', JSON.stringify(user));
        this.userSubject.next(user);
        return user;
      }));
  }

  getProfile() {
    return this.http.get<User>(`${baseUrl}/auth/me`);
  }

  updateLibrary(bookID: string, updatedShelf: BookShelf, updatedRating: number) {

    // return this.http.get<User>(`${baseUrl}/user/${bookID}/book`, {updatedShelf, updatedRating})
    return this.http.put<User>(`${baseUrl}/user/${bookID}/book`, { shelve: updatedShelf, rating: updatedRating })
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
