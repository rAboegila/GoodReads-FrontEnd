import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../_services/user.service';
import { NgToastService } from 'ng-angular-popup';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private _router: Router, private _userService: UserService, private _toast: NgToastService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const user = this._userService.userValue;
    if (user && user.role === 'admin') {
      // authorised so return true
      return true;
    }

    // not logged in so redirect to home page with unauthorized alert message
    this._router.navigate(['/']);
    this._toast.error({ detail: "Unauthorized!", summary: "You are not an administrator!", duration: 5000 });
    return false;
  }

}
