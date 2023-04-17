import { Component } from '@angular/core';
import { FooterService } from 'src/app/_services/footer.service';
import { NavbarService } from 'src/app/_services/navbar.service';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent {

  constructor(public nav: NavbarService, public footer: FooterService) { }

  ngOnInit() {
    this.nav.hide();
    this.footer.hide();
  }

  ngOnDestroy() {
    this.nav.show();
    this.footer.show();
  }

}
