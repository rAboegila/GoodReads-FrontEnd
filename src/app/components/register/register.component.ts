import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/_models/User';
import { UserService } from 'src/app/_services/user.service';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomValidators {
  static MatchValidator(source: string, target: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const sourceCtrl = control.get(source);
      const targetCtrl = control.get(target);

      return sourceCtrl && targetCtrl && sourceCtrl.value !== targetCtrl.value
        ? { mismatch: true }
        : null;
    };
  }
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  user!: User;
  myForm: FormGroup;
  image: any;
  isLoading: boolean = false;
  constructor(private _userService: UserService, private _router: Router) {

    this.myForm = new FormGroup({
      firstName: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
      lastName: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
      username: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl(null, [Validators.required, Validators.minLength(8)]),
    },
      [CustomValidators.MatchValidator('password', 'confirmPassword')]
    );
  }

  submitForm() {
    this.isLoading = true;
    const formData = new FormData();
    formData.append('firstName', this.myForm.get('firstName')?.value);
    formData.append('lastName', this.myForm.get('lastName')?.value);
    formData.append('username', this.myForm.get('username')?.value);
    formData.append('email', this.myForm.get('email')?.value);
    formData.append('password', this.myForm.get('password')?.value);
    formData.append('confirmPassword', this.myForm.get('confirmPassword')?.value);
    formData.append('image', this.image);

    this._userService.register(formData)
      .subscribe({
        next: () => {
          this._router.navigate(['/']);
          this.isLoading = false;
        },
        error: res => {
          if (res.error.errors) {
            res.error.errors.forEach((error: any) => {
              this.isLoading = false;

            })
          }
        }
      });
  }

  uploadImage(event: any) {
    if (event.target.files.length) {
      const file = event.target.files[0];
      this.image = file;
    }
  }

  get passwordMatchError() {
    return (
      this.myForm.getError('mismatch') &&
      this.myForm.get('confirmPassword')?.touched
    );
  }

}
