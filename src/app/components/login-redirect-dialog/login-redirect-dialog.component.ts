import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-login-redirect-dialog',
  templateUrl: './login-redirect-dialog.component.html',
  styleUrls: ['./login-redirect-dialog.component.css']
})
export class LoginRedirectDialogComponent {
  constructor(public dialogRef: MatDialogRef<LoginRedirectDialogComponent>) { }
}
