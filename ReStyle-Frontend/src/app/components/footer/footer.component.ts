import { Component, OnInit } from '@angular/core';
import { UserAccountService } from '../../services/user-account.service';
import { firebase } from 'firebaseui-angular';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.sass']
})
export class FooterComponent implements OnInit {
  easterEggEnabled: boolean;
  authenticated: boolean;
  homeDisabled: boolean;
  addDisabled: boolean;

  userImagePath = '/images/defaultAvatar.png';

  constructor(private userAccountService: UserAccountService, private router: Router) {
    this.easterEggEnabled = false;
  }

  ngOnInit() {
    this.setClasses();
    // console.log(this.router.url);
  }

  updateAuth(user) {
    this.authenticated = (user !== null);
    if (this.authenticated) {
    const userObject = this.userAccountService.getUserData(user.uid);
    userObject.subscribe( object => {
      this.userImagePath = `/images/${object.userPhotoPath}`;
    });
    } else {
      this.userImagePath = '/images/defaultAvatar.png';
    }



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

