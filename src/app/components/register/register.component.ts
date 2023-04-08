import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { User } from 'src/app/_models/User';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  user!: User;
  myForm: FormGroup;

  constructor(private _userService: UserService, private _router: Router) {

    this.myForm = new FormGroup({
      firstName: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
      lastName: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
      username: new FormControl(null, [Validators.minLength(3), Validators.maxLength(20)]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
    });
  }

  submitForm() {
    this._userService.register(this.myForm.value)
            .pipe(first())
            .subscribe({
                next: () => {
                    // this.alertService.success('Registration successful', { keepAfterRouteChange: true });
                    // this.router.navigate(['../login'], { relativeTo: this.route });
                    this._router.navigate(['/']);
                },
                error: error => {
                    // this.alertService.error(error);
                    // this.loading = false;
                    console.log(error);
                }
            });

    // this._users.addNewUser(this.myForm.value);
  }
}
