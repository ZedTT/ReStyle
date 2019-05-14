import { Component, OnInit, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {
  @Output() easterEggOutput: EventEmitter<boolean> = new EventEmitter();
  easterEggEnabled: boolean;
  easterEggClickCount = 0;

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
    this.easterEggClickCount++;
    if (this.easterEggClickCount > 4) {
      this.easterEggClickCount = 0;
      this.easterEggEnabled = !this.easterEggEnabled;
      this.easterEggOutput.emit(this.easterEggEnabled);
    }
  }

}
