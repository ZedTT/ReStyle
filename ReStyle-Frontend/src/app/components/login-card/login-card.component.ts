import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-card',
  templateUrl: './login-card.component.html',
  styleUrls: ['./login-card.component.sass']
})
export class LoginCardComponent implements OnInit {
  authenticated: boolean;

  constructor() { }

  ngOnInit() {
    this.authenticated = false; // TODO: Changed based on if user is logged in or not. Subscribe to an observable
  }

  /**
   * Sets dynamic classes
   * @returns the classes that need to be set by angular
   * When the value of an attribute changes, the class is automatically set.
   */
   setClasses() {
    const classes = {
      hidden: this.authenticated,
    };

    return classes;
  }

}
