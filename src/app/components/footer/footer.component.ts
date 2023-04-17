import { Component } from '@angular/core';
import { FooterService } from 'src/app/_services/footer.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

  constructor(public footer: FooterService) { }

}
