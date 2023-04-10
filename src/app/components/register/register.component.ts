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
  image: any;

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
    const formData = new FormData();
    formData.append('firstName', this.myForm.get('firstName')?.value);
    formData.append('lastName', this.myForm.get('lastName')?.value);
    formData.append('username', this.myForm.get('username')?.value);
    formData.append('email', this.myForm.get('email')?.value);
    formData.append('password', this.myForm.get('password')?.value);
    formData.append('image', this.image);

    this._userService.register(formData)
      .pipe(first())
      .subscribe({
        next: () => {
          this._router.navigate(['/']);
        },
        error: error => {
          console.log(error);
        }
      });
  }

  uploadImage(event: any) {
    if (event.target.files.length) {
      const file = event.target.files[0];
      this.image = file;
    }
  }
}
