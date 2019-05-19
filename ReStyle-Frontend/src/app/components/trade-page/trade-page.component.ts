import { Component, OnInit, Input, ViewChild, ChangeDetectorRef, NgZone } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { TradeItem } from '../../models/TradeItem';
import { TradeService } from '../../services/trade.service';
import { firebase } from 'firebaseui-angular';
import { UserAccountService } from '../../services/user-account.service';

@Component({
  selector: 'app-trade-page',
  templateUrl: './trade-page.component.html',
  styleUrls: ['./trade-page.component.sass']
})
export class TradePageComponent implements OnInit {
  @ViewChild('previewMe') previewMe;
  @ViewChild('previewThem') previewThem;
  @ViewChild('columnThem') columnThem;
  @ViewChild('columnMe') columnMe;
  queryParams: { them: string, item: string };
  itemId: number; // the id of the item whose 'trade' button was clicked
  meId: string = null; // the user id of the current user
  themId: string; // the id of the user with whom a trade was initialized
  thumbnailsMe: TradeItem[] = []; // the list of items that belong to the requester that are currently selected for trading
  thumbnailsThem: TradeItem[] = []; // the list of items that belong to the notified user that are currently selected for trading
  columnMeArray: TradeItem[]; // the list of items that belong to the user who initialized a trade
  columnThemArray: TradeItem[]; // the list of items that belong to the user with whom a trade was initialized
  userImageMe = 'defaultAvatar.png';
  userImageThem = 'defaultAvatar.png';

  /**
   * Creates an instance of trade page component.
   * Initializes a router and tradeService to be used on the page
   * @param router used to grab the query params from the url
   * @param tradeService used to get the items to display
   * @param changeDetectorRef used to fix a bug with columnMeArray not updating fast enough
   */
  constructor(
    private router: Router,
    private tradeService: TradeService,
    private changeDetectorRef: ChangeDetectorRef,
    private ngZone: NgZone, // ? See https://stackoverflow.com/questions/40054416/detect-changes-made-by-firebase-sdk-in-angular-2
    // We need to force firebase to run inside of the angular zone to avoid using changeDetectorRef
    private userAccountService: UserAccountService
    ) { }

  ngOnInit() {
    // Url will look like /trade?you=QqJVsgMeiVcF1bW0x9b28sHK9fh2&item=1
    // We will parse out the query params from the url
    // This will give us { you: "QqJVsgMeiVcF1bW0x9b28sHK9fh2", item: "1" }
    const qParams = this.router.parseUrl(this.router.url).queryParams;
    this.queryParams = { them: qParams.you, item: qParams.item };
    this.itemId = parseInt(this.queryParams.item, 10);
    this.themId = this.queryParams.them;
    // store the uid of the currently logged in user, who initilized the trade
    const currentUser = firebase.auth().currentUser;
    if (currentUser) {
      this.meId = firebase.auth().currentUser.uid;
      // Call getColumnMe once with current user
      this.getColumnMe(this.meId);
    }
    // Use firebase to detect uid changes and run getColumnMe again incase uid starts as null on a refresh or something
    firebase.auth().onAuthStateChanged(user => {
      // console.log('auth state change', (user) ? user.uid : null);
      if (user) {
        this.ngZone.run(() => {
          this.meId = user.uid;
          // console.log(this.meId);
          this.getColumnMe(this.meId);
          this.userAccountService.getUserData(user.uid).subscribe(u => {
            this.userImageMe = u.userPhotoPath;
          });
        });
      }
    });
    // get the column for the user with whom a trade was initialized
    this.getColumnThem();
    // get the picture for the other user
    this.userAccountService.getUserData(this.themId).subscribe(u => {
      console.log('them', this.themId);
      console.log(u);
      if (u.userPhotoPath) {
        this.userImageThem = u.userPhotoPath;
      }
    });

  }

  /**
   * Gets the items that belong to the user who initialized the trade (currently logged in user)
   * and adds these items to the columnMe array of TradeItems.
   * These items will be displayed in the column
   * @param uid the id of the current user. Usually this.meId.
   */
  getColumnMe(uid) {
    if (uid !== null) {
      // ! If you are getting `.subsribe is not a function` error. Get latest backend.
      // The problem is that older backend versions used hardcoded data that was not an observable
      this.tradeService.getItemsByUser(uid).subscribe(temp => {
        for (const item of temp) {
          item.selected = false;
        }
        console.log(uid);
        console.log(temp);
        this.columnMeArray = temp;
        console.log(this.columnMeArray);
        // We need this to remind angular that we changed things
        // Specifically because onAuthStateChanged causes this to be called twice in rapid succession
        // This is only needed on refresh
        // ? May no longer be needed because NgZone is a better fix
        // * this.changeDetectorRef.markForCheck();
      });
    }
  }

  /**
   * Gets the items that belong to the user with whom a trade was initialized
   * and adds these items to the columnThem array of TradeItems
   */
  getColumnThem() {
    this.tradeService.getItemsByUser(this.themId).subscribe(temp => {
      let item0;
      for (const item of temp) {
        item.selected = false;
      }
      this.columnThemArray = temp;
      // Sort the item to the beginning of the array
      // ? See https://stackoverflow.com/a/23921775
      // setTimeout makes it async
      setTimeout(() => {
        temp.sort((item1, item2) => {
          return item1.itemId === item0.itemId ? -1 : item2.itemId === item0.itemId ? 1 : 0;
        });
      }, 0);
      // Make the item that was selected for trade start out as selected
      for (const item of this.columnThemArray) {
        if (item.itemId === this.itemId) {
          item.selected = true;
          this.toggleItemThem(item);
          item0 = item;
        }
      }
    });
  }

  /**
   * Called when an item is toggled in the 'me' column.
   * If the item is being selected, adds the item to the thumbnailsMe array.
   * If the item is being unselected, removes the item from the thumbnailsMe array.
   * * Used to add or remove the item from the thumbnails preview
   * @param item The item that was toggled. A TradeItem
   */
  toggleItemMe(item) {
    // check the boolean if the item is selected or not.
    if (item.selected) {
      // Add the item to the end of the array
      this.thumbnailsMe.push(item);
    } else {
      // Find the item in the array and remove it
      // Check each item in the array and keep it only if it is not equal to the passed item argument
      this.thumbnailsMe = this.thumbnailsMe.filter(temp => temp !== item);
    }

    // * Log some debug stuff
    // console.log('Me', item);
    // console.log(this.thumbnailsMe);
  }

  /**
   * Called when an item is toggled in the 'me' column.
   * If the item is being selected, adds the item to the thumbnailsThem array.
   * If the item is being unselected, removes the item from the thumbnailsThem array.
   * * Used to add or remove the item from the thumbnails preview
   * @param item The item that was toggled. A TradeItem
   */
  toggleItemThem(item) {
    // check the boolean if the item is selected or not.
    if (item.selected) {
      // Add the item to the end of the array
      this.thumbnailsThem.push(item);
    } else {
      // Find the item in the array and remove it
      // Check each item in the array and keep it only if it is not equal to the passed item argument
      this.thumbnailsThem = this.thumbnailsThem.filter(temp => temp !== item);
    }

    // * Log some debug stuff
    // console.log('Them', item);
    // console.log(this.thumbnailsThem);
  }

  requestTrade() {
    const requesterTradeItems: number[] = [];
    const notifiedUserTradeItems: number[] = [];
    // fill the requesterTradeItems array with item ids
    this.thumbnailsMe.forEach(item => {
      requesterTradeItems.push(item.itemId);
    });
    // fill the notifiedUserTradeItems array with item ids
    this.thumbnailsThem.forEach(item => {
      notifiedUserTradeItems.push(item.itemId);
    });
    if (requesterTradeItems.length > 0 && notifiedUserTradeItems.length > 0) {
      // post the trade request to the server
      this.tradeService.requestTrade(
        this.meId, this.themId,
        requesterTradeItems,
        notifiedUserTradeItems
        );
      // navigate the user back to the home page (or maybe the trade inbox page?)
      this.router.navigate(['/']);
    } else {
      alert('Each user must trade at least one item');
    }
  }

}
