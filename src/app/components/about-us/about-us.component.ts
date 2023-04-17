import { Component } from '@angular/core';
import { faAngular, faNodeJs, faEnvira, faBootstrap } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent {
  icons = { 'angular': faAngular, 'node': faNodeJs, 'mongo': faEnvira, 'bootstrap': faBootstrap }

}
