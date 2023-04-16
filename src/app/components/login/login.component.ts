import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/_models/User';
import { UserService } from 'src/app/_services/user.service';
// import { NgToastService } from 'ng-angular-popup'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  users!: User[];
  errorMessage!:string;


  constructor(private _userService: UserService, private _router: Router) {
  }

  submitForm(form: NgForm): void {
    this._userService.login(form.value['username'], form.value['password'])
      .subscribe({
        next: () => {
          form.reset();
          this.errorMessage = '';
          this._router.navigate(['/']);
          // this._toast.success({ detail: "You have successfully logged in", summary: "Login Success", duration: 5000 });
        },
        error: res => {
          this.errorMessage = 'invalid data';
          if (res.error.errors) {
            res.error.errors.forEach((error: any) => {
              // this._toast.error({ detail: "Failed To Login!", summary: (error.msg ? error.msg : error).split(',')[1], duration: 5000 });
            })
          }

        }
      });

  }

}
