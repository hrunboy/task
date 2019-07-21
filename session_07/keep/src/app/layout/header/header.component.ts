import { Component, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  showControl: boolean = true;

  @Output() showNavbar = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  //展示
  show(){
    this.showControl = !this.showControl;
    this.showNavbar.emit(this.showControl ? 'show' : 'hide');
  }
}
