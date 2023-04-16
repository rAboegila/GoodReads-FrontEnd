import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavbarService } from 'src/app/_services/navbar.service';
import { UserService } from 'src/app/_services/user.service';
import { uploadsUrl } from 'src/app/_services/helper';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLoggedIn: boolean = false;
  userRole: string = '';
  name: string = '';
  userImage: string = '';
  constructor(private _userService: UserService, private _router: Router, public nav: NavbarService) {
    this._userService.user.subscribe(x => {
      this.isLoggedIn = !!x
      this.userRole = x?.role || '';
      this.name = x?.firstName + ' ' + x?.lastName || '';
      this.userImage = `${uploadsUrl}/users/${x?.image}` || '';
    });
  }
  ngOnInit(): void {
  }

  logout(): void {
    this._userService.logout();
  }

}
