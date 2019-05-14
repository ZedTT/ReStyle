import { Component, OnInit } from '@angular/core';
import { firebase } from 'firebaseui-angular';
import { User } from '../../models/User';
import { UserAccountService } from '../../services/user-account.service';
@Component({
  selector: 'app-login-card',
  templateUrl: './login-card.component.html',
  styleUrls: ['./login-card.component.sass']
})
export class LoginCardComponent implements OnInit {
  authenticated: boolean;
  user: any;

  constructor(private userAccountService: UserAccountService) {
    
    // When user is logged in, this part is triggered automatically and post user data to the database.
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const uid = user.uid;
        const userName = user.displayName;
        console.log(uid, userName);
        console.log(userAccountService.postUserData(uid, userName));
        userAccountService.postUserData(uid, userName).subscribe(res => {
          console.log(res);
        });
        // });
      }
    });
  }

  ngOnInit() {
    // TODO: Make this an obserable so that we dont't need to run it in setClasses every time
    this.authenticated = firebase.auth().currentUser !== null;
    this.user = firebase.auth().currentUser;


  }
  /**
   * Sets dynamic classes for the login button
   * Sets the button to either hidden or not
   * @returns the classes that need to be set by angular
   * When the value of an attribute changes, the class should be automatically set.
   * ! This should be using an obserable to maximum reliability (Ask Zack or see TODO in ngOnInit())
   */
  setLoginHidden() {
    this.authenticated = firebase.auth().currentUser !== null;
    const classes = {
      hidden: this.authenticated,
    };
    return classes;
  }

  logOut() {
    firebase.auth().signOut()
      .then(() => {
        console.log('User is signed out.');
        // Sign-out successful.
      })
      .catch((error) => {
        console.log('An error is caught.');

        // An error happened
      });
  }


}
