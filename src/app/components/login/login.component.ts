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
  }

  submitForm(form: NgForm): void {
    this._userService.login(form.value['username'], form.value['password'])
      .pipe(first())
      .subscribe({
        next: () => {
          form.reset();
          this._router.navigate(['/']);
        },
        error: error => {
          alert("User not found, You have to signup first");
          this._router.navigate(['/register']);
          console.log(error);
        }
      });

  }

}
