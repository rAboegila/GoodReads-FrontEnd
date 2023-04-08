import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { User } from 'src/app/_models/User';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  users!: User[];

  constructor(private _userService: UserService, private _router: Router) {
    // this.users = this._users.users;
  }

  submitForm(form: NgForm):void {
    // const loggedIn = this._users.isUserLoggedIn(form.value['email'], form.value['password']);
    // if(!loggedIn){
      // alert("User not found, You have to signup first");
      // this._router.navigate(['signup']);
      // return;
    // }
    // this._router.navigate(['']);
    // form.reset();

    this._userService.login(form.value['email'], form.value['password'])
            .pipe(first())
            .subscribe({
                next: () => {
                    // get return url from query parameters or default to home page
                    // const returnUrl = this._router.snapshot.queryParams['returnUrl'] || '/';
                    this._router.navigate(['/']);
                },
                error: error => {
                    // this.alertService.error(error);
                    // this.loading = false;
                    console.log(error);
                }
            });

  }

}
