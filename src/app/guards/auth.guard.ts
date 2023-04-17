import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../_services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private _router: Router, private _userService: UserService, private snackBar: MatSnackBar) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const user = this._userService.userValue;
    if (user && user.role === 'user') {
      // authorised so return true
      return true;
    }

    // not logged in so redirect to login page
    this._router.navigate(['/login']);
    this.snackBar.open("Unauthorized, You have to login first!", 'Close', { duration: 2000, verticalPosition: 'top', horizontalPosition: 'end', panelClass: ['error-snackbar'] });
    return false;
  }

}
