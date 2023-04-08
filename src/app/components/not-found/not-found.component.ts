import { Component } from '@angular/core';
import { NavbarService } from 'src/app/_services/navbar.service';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent {

  constructor(public nav: NavbarService) { }

  ngOnInit() {
    this.nav.hide();
  }

  ngOnDestroy() {
    this.nav.show();
  }

}
