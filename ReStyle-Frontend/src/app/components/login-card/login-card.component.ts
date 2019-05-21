import { Component, OnInit, ChangeDetectorRef, NgZone } from '@angular/core';
import { firebase } from 'firebaseui-angular';
import { UserAccountService } from '../../services/user-account.service';

@Component({
  selector: 'app-login-card',
  templateUrl: './login-card.component.html',
  styleUrls: ['./login-card.component.sass']
})
export class LoginCardComponent implements OnInit {
  // True if a user is currently logged in. Used to set *ngIf
  authenticated: boolean;

  // ChangeDetector allows us to check if a variable has changed
  // Use in onAuthStateChanged in ngOnInit
  constructor(private changeDetectorRef: ChangeDetectorRef, private userAccountService: UserAccountService, private ngZone: NgZone) {
    // When user is logged in, this part is triggered automatically and post user data to the database.
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const uid = user.uid;
        const userName = user.displayName;
        const email = user.email;
        console.log(uid, userName, email);
        console.log(userAccountService.postUserData(uid, userName, email));
        userAccountService.postUserData(uid, userName, email).subscribe(res => {
          console.log(res);
        });
        // });
      }
    });
   }

  ngOnInit() {
    // * For debugging
    // console.log('Who is the current user? ' + firebase.auth().currentUser);
    // console.log(`Does current user exist? ${firebase.auth().currentUser !== null}`);
    // console.log('On itnit: Authenticated variable is set to: ' + this.authenticated);

    /**
     * Whenever the auth state of the user changes, we need to
     * set this.authenticated.
     * When this.authenticated is true, logout button shows
     * When this.authenticated is false, login button shows
     */
    firebase.auth().onAuthStateChanged((response) => {
      /**
       * NgZone forces the code to run as part of angular, rather than outside angular
       * This makes it so that the code uses angulars change detection automatically
       */
      this.ngZone.run(() => {
        this.authenticated = firebase.auth().currentUser !== null;
      });

      // * For debugging
      // console.log('Auth state has changed! Current user is: ' + firebase.auth().currentUser);
      // console.log(`Does current user exist? ${firebase.auth().currentUser !== null}`);
      // console.log('Authenticated variable is set to: ' + this.authenticated);

      /**
       * When the page is loaded, firebase hasn't yet returned the auth status.
       * Once onAuthStateChanged triggers,
       * we need to force the page to detect if there's a change to any variables
       * * Force the page to check what this.authenticated is currently.
       * Normally, angular does this automatically, not sure why this is needed here.
       *
       * ? BootStrap's Carousel may have a relationship with this problem (interval?).
       * TODO investigate ViewDestroyedError on login. Doesn't appear to have any functional effect.
       *
       * If the user is not currently logged in,
       * we don't need to detect changes because the user is navigating to login page anyways.
       *
       * detectChanges() hinders the routing to /login page,
       * so we only call it when the user is currently authenticated and (presumably) logging out.
       *
       * ! NgZone removes the need for changeDetectorRef
       */
      // if (this.authenticated) {
      //   console.log('change detected');
      //   this.changeDetectorRef.detectChanges();
      // }
    });
  }

  logOut() {
    firebase.auth().signOut()
    .then(() => {
      console.log('User is signed out.');
      console.log(`Does current user exist? ${firebase.auth().currentUser !== null}`);
      this.changeDetectorRef.detectChanges();
      // Sign-out successful.
    }).catch((error) => {
      console.log('An error is caught.');
      // An error happened
    });
  }

}
