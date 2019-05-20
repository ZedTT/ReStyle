import { Component, OnInit, Input, ViewChild, ChangeDetectorRef, NgZone } from '@angular/core';
import { TradeItem } from '../../models/TradeItem';
import { TradeService } from '../../services/trade.service';
import { UserAccountService } from '../../services/user-account.service';
import { firebase } from 'firebaseui-angular';
import { getTreeControlMissingError } from '@angular/cdk/tree';
import { getBootstrapListener } from '@angular/router/src/router_module';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.sass']
})


export class UserProfileComponent implements OnInit {
  meId: string = null; // the user id of the current user
  meName: string;
  meSwapScore: number;
  meEmail: string;
  userImageMe = 'defaultAvatar.png';
  meCity: string;
  mePhone: string;
  mePostalCode: string;
  mePreferredContact: string;
  myItemsArray: TradeItem[]; // the list of items that belong to the user who initialized a trade

  constructor(
    private tradeService: TradeService,
    private ngZone: NgZone,
    private userAccountService: UserAccountService
  ) { }

  ngOnInit() {
    /**
     * Probably better to get uid as a query for speed,
     * but that might be insecure that user can see other user's data
     * by manually typing other user's uid on the url
     */
    const currentUser = firebase.auth().currentUser;
    if (currentUser) {
      this.meId = firebase.auth().currentUser.uid;
      // Call getColumnMe once with current user
      this.getMyInventory(this.meId);
    }
    // Use firebase to detect uid changes and run getColumnMe again incase uid starts as null on a refresh or something
    firebase.auth().onAuthStateChanged(user => {
      // console.log('auth state change', (user) ? user.uid : null);
      if (user) {
        this.ngZone.run(() => {
          this.meId = user.uid;
          // console.log(this.meId);
          this.getMyInventory(this.meId);
          this.userAccountService.getUserDetail(user.uid).subscribe(u => {
            console.log('getUserDetail function is working');
            console.log(u);
            this.meName = u.displayname;
            this.mePhone = u.phone;
            this.meEmail = u.email;
            this.mePostalCode = u.postalcode;
            this.meCity = u.city;
            this.mePreferredContact = u.preferredContact;
            this.userImageMe = u.profilePic;
          });
        });
      }
    });

  }

  /**
   * Gets the items that belong to the user who initialized the trade (currently logged in user)
   * and adds these items to the columnMe array of TradeItems.
   * These items will be displayed in the column
   * @param uid the id of the current user. Usually this.meId.
   */
  getMyInventory(uid) {
    if (uid !== null) {
      // ! If you are getting `.subsribe is not a function` error. Get latest backend.
      // The problem is that older backend versions used hardcoded data that was not an observable
      this.tradeService.getItemsByUser(uid).subscribe(temp => {
        for (const item of temp) {
          item.selected = false;
        }
        console.log(uid);
        console.log(temp);
        this.myItemsArray = temp;
        console.log(this.myItemsArray);
        // We need this to remind angular that we changed things
        // Specifically because onAuthStateChanged causes this to be called twice in rapid succession
        // This is only needed on refresh
        // ? May no longer be needed because NgZone is a better fix
        // * this.changeDetectorRef.markForCheck();
      });
    }
  }


}
