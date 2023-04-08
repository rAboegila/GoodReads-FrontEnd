import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { User } from '../_models/User';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { baseUrl } from './helper';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject: BehaviorSubject<User | null>;
  public user: Observable<User | null>;

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

  login(email: string, password: string) {
    // return this.http.post<User>(`${baseUrl}/auth/login`, { username: 'kminchelle', password: '0lelplR' })
    return this.http.post<User>(`${baseUrl}/auth/login`, { email, password })
      .pipe(map(user => {
        console.log("user: ", user);
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

  register(user: User) {
    return this.http.post<User>(`${baseUrl}/auth/register`, user)
      .pipe(map(user => {
        console.log("user: ", user);
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('user', JSON.stringify(user));
        this.userSubject.next(user);
        return user;
      }));
  }

  // getAll() {
  // return this.http.get<User[]>(`${baseUrl}/users`);
  // }
  // 
  // getById(id: string) {
  // return this.http.get<User>(`${baseUrl}/users/${id}`);
  // }

  getProfile() {
    return this.http.get<User>(`${baseUrl}/auth/me`).subscribe((user: User) => {
      console.log("getProfile: ", user);
      // localStorage.setItem('user', JSON.stringify(user));
      // this.userSubject.next(user);
      return user;
    }
    );
  }

  // update(id: string, params: any) {
  //   return this.http.put(`${baseUrl}/auth/${id}`, params)
  //     .pipe(map(x => {
  //       // update stored user if the logged in user updated their own record
  //       if (id == this.userValue?.id) {
  //         // update local storage
  //         const user = { ...this.userValue, ...params };
  //         localStorage.setItem('user', JSON.stringify(user));

  //         // publish updated user to subscribers
  //         this.userSubject.next(user);
  //       }
  //       return x;
  //     }));
  // }

  // delete(id: string) {
  //   return this.http.delete(`${baseUrl}/auth/${id}`)
  //     .pipe(map(x => {
  //       // auto logout if the logged in user deleted their own record
  //       if (id == this.userValue?.id) {
  //         this.logout();
  //       }
  //       return x;
  //     }));
  // }
}
