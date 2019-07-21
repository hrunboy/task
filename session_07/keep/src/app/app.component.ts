import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  navbarShow  = true;

  navbarControl(info){
    this.navbarShow = (info == 'show');
  }
}
