import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.sass']
})
export class FooterComponent implements OnInit {
  easterEggEnabled: boolean;

  constructor() {
    this.easterEggEnabled = false;
   }

  ngOnInit() {
    this.setClasses();
  }

  setClasses() {
    const classes = {
      footer: true,
      navbar: true,
      'fixed-bottom': true,
      'easter-egg': this.easterEggEnabled
    };
    return classes;
  }

  toggleEasterEgg() {
    this.easterEggEnabled = !this.easterEggEnabled;
  }

}
