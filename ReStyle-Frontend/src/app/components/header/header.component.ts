import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {
  easterEggEnabled: boolean;

  constructor() {
    this.easterEggEnabled = false;
   }

  ngOnInit() {
    this.setClasses();
  }

  setClasses() {
    const classes = {
      header: true,
      navbar: true,
      'navbar-dark': true,
      'fixed-top': true,
      'easter-egg': this.easterEggEnabled
    };
    return classes;
  }

  toggleEasterEgg() {
    this.easterEggEnabled = !this.easterEggEnabled;
  }

}
