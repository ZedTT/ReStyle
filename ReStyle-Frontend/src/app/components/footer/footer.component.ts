import { Component, OnInit } from '@angular/core';
import { UserAccountService } from '../../services/user-account.service';
import { firebase } from 'firebaseui-angular';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.sass']
})
export class FooterComponent implements OnInit {
  easterEggEnabled: boolean;

  constructor(private userAccountService: UserAccountService) {
    this.easterEggEnabled = false;
    
    firebase.auth().onAuthStateChanged( user => {
      const userObject = this.userAccountService.getCurrentUserData();
    })
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

