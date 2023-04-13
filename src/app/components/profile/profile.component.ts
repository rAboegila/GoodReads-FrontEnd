import { Component } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent {

  constructor(private _userService: UserService) {

    this._userService.user.subscribe(x => {

      console.log("logged in user ", x);
    });
  }

}