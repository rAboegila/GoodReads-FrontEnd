import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarService } from 'src/app/_services/navbar.service';
import { UserService } from 'src/app/_services/user.service';
import { uploadsUrl } from 'src/app/_services/helper';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  isLoggedIn: boolean = false;
  userRole: string = '';
  userName: string = '';
  userImage: string = '';

  constructor(private _userService: UserService, private _router: Router, public nav: NavbarService) {
    this._userService.user.subscribe(x => {
      this.isLoggedIn = !!x
      this.userRole = x?.userRole || '';
      this.userName = x?.userName || '';
      this.userImage = `${uploadsUrl}/users/${x?.userImage}` || '';
    });
  }

  logout(): void {
    this._userService.logout();
  }

}
