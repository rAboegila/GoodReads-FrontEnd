import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/_models/User';
import { UserService } from 'src/app/_services/user.service';
<<<<<<< HEAD
import { MatSnackBar } from '@angular/material/snack-bar';
=======
// import { NgToastService } from 'ng-angular-popup'
>>>>>>> rawan

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  users!: User[];

  constructor(private _userService: UserService, private _router: Router, private snackBar: MatSnackBar) {
  }

  submitForm(form: NgForm): void {
    this._userService.login(form.value['username'], form.value['password'])
      .subscribe({
        next: () => {
          form.reset();
          this._router.navigate(['/']);
          // Snackbar that opens with success background
          this.snackBar.open('You have successfully logged in!', 'OK', { duration: 4000, verticalPosition: 'top', horizontalPosition: 'end', panelClass: ['success-snackbar'] });
        },
        error: res => {
          if (res.error.errors) {
            res.error.errors.forEach((error: any) => {
              this.snackBar.open((error.msg ? error.msg : error), 'Close', { duration: 4000, verticalPosition: 'top', horizontalPosition: 'end', panelClass: ['error-snackbar'] });
            })
          }
        }
      });

  }

}
