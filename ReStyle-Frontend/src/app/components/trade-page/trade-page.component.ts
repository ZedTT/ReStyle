import { Component, OnInit, Input, ViewChild, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { TradeItem } from '../../models/TradeItem';
import { TradeService } from '../../services/trade.service';
import { firebase } from 'firebaseui-angular';
import { UserAccountService } from '../../services/user-account.service';
import { ConfirmationBoxComponent } from '../confirmation-box/confirmation-box.component';
import { MatDialog, MatSnackBar } from '@angular/material';

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
  userImageMe = 'defaultAvatar.png'; // the user image of the user who initialized the trade.
  // Defaults to the defaultAvatar in case of error.
  userImageThem = 'defaultAvatar.png'; // the user image of the user with whome the trade was initialized.
  // Defaults to the defaultAvatar in case of error.
  userNameMe = 'Your items'; // the user name of the user who initialized the trade
  userNameThem = 'Their items'; // the user name of the user with whome a trade was initialized

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
    private ngZone: NgZone, // ? See https://stackoverflow.com/questions/40054416/detect-changes-made-by-firebase-sdk-in-angular-2
    // We need to force firebase to run inside of the angular zone to avoid using changeDetectorRef
    private userAccountService: UserAccountService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
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
            this.userNameMe = u.userName;
          });
        });
      }
    });
    // get the column for the user with whom a trade was initialized
    this.getColumnThem();
    // get the picture for the other user
    this.userAccountService.getUserData(this.themId).subscribe(u => {
      // console.log('them', this.themId);
      // console.log(u);
      if (u.userPhotoPath) {
        this.userImageThem = u.userPhotoPath;
        this.userNameThem = u.userName;
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
        this.columnMeArray = temp;
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
        // tsLint sometimes says this will always return false, but it is wrong. This works.
        // to get tsLint to calm down, try opening the TradeItem model.
        // ItemID used to be a string in the TradeItem model, and it gets confused
        if (typeof item.itemId === 'number' && item.itemId === this.itemId) {
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
      // Check each item in the array axnd keep it only if it is not equal to the passed item argument
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

  openSnackBar(message: string, actionMessage: string) {
    this.snackBar.open(message, actionMessage, {
      duration: 4000,
      verticalPosition: 'bottom'
    });
  }

  /**
   * Makes a post request to the server when the user clicks Request Trade button
   * Creates arrays of item ids based on the thumbnails arrays
   * If the user tries to request the trade while one or both of the users
   * have no items in the thumbnails array, it will throw an alert
   * and will not make the post request.
   */
  requestTrade() {
    const dialogRef = this.dialog.open(ConfirmationBoxComponent, {
      width: '250px',
      height: '200px',
      data: 'Are you sure you would like to make this trade request?'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
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
        // check that both users are trading at least one item
        if (requesterTradeItems.length > 0 && notifiedUserTradeItems.length > 0) {
          // post the trade request to the server
          this.tradeService.requestTrade(
            this.meId, this.themId,
            requesterTradeItems,
            notifiedUserTradeItems
          ).subscribe(res => {
            // console.log(res);
            if (!res.error) {
              // * Happy path, notify the user that the item was successfully added
              this.openSnackBar('Trade request was sent successfully!', 'Ok');
              // navigate the user back to the home page (or maybe the trade inbox page?)
              this.router.navigate(['/']);
            } else {
              this.openSnackBar('Something went wrong, please try again.', 'Dismiss');
            }
          });
        } else {
          this.openSnackBar('Each user must trade at least one item.', 'Dismiss');
        }
      }
    });

  }

}
