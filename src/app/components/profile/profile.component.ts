import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/_models/User';
import { uploadsUrl } from 'src/app/_services/helper';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent {

  user: User | null;
  userImage: string = '';
  subscripton!: Subscription;

  constructor(private _userService: UserService) {
    this.user = this._userService.userValue;
    this.userImage = `${uploadsUrl}/users/${this.user?.image}` || '';
  }
  
  ngOnInit(): void {
    this.subscripton = this._userService.getProfile().subscribe(response => {
      this.user = response.data;
    });
  }

  ngOnDestroy(): void {
    this.subscripton.unsubscribe();
  }

}