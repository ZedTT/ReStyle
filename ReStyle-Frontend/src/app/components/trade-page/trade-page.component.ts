import { Component, OnInit, Input, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { TradeItem } from '../../models/TradeItem';
import { TradeService } from '../../services/trade.service';
import { firebase } from 'firebaseui-angular';

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
  itemId: string; // the id of the item whose 'trade' button was clicked
  meId: string = null; // the user id of the current user
  themId: string; // the id of the user with whom a trade was initialized
  thumbnailsMe: TradeItem[] = []; // the list of items that belong to the requester that are currently selected for trading
  thumbnailsThem: TradeItem[] = []; // the list of items that belong to the notified user that are currently selected for trading
  columnMeArray: TradeItem[]; // the list of items that belong to the user who initialized a trade
  columnThemArray: TradeItem[]; // the list of items that belong to the user with whom a trade was initialized

  /**
   * Creates an instance of trade page component.
   * Initializes a router and tradeService to be used on the page
   * @param router used to grab the query params from the url
   * @param tradeService used to get the items to display
   * @param changeDetectorRef used to fix a bug with columnMeArray not updating fast enough
   */
  constructor(private router: Router, private tradeService: TradeService, private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit() {
    // Url will look like /trade?you=QqJVsgMeiVcF1bW0x9b28sHK9fh2&item=1
    // We will parse out the query params from the url
    // This will give us { you: "QqJVsgMeiVcF1bW0x9b28sHK9fh2", item: "1" }
    const qParams = this.router.parseUrl(this.router.url).queryParams;
    this.queryParams = { them: qParams.you, item: qParams.item };
    this.itemId = this.queryParams.item;
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
      console.log('auth state change', (user) ? user.uid : null);
      if (user) {
        this.meId = user.uid;
        console.log(this.meId);
        this.getColumnMe(this.meId);
      } else {
        console.log('else');
      }
    });
    // get the column for the user with whom a trade was initialized
    this.getColumnThem();
    console.log(this.meId);
  }

  /**
   * Gets the items that belong to the user who initialized the trade (currently logged in user)
   * and adds these items to the columnMe array of TradeItems.
   * These items will be displayed in the column
   * @param uid the id of the current user. Usually this.meId.
   */
  getColumnMe(uid) {
    if (uid !== null) {
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
        // This makes us need another detection in trade item component
        this.changeDetectorRef.detectChanges();
      });
    }
  }

  /**
   * Gets the items that belong to the user with whom a trade was initialized
   * and adds these items to the columnThem array of TradeItems
   */
  getColumnThem() {
    this.tradeService.getItemsByUser(this.themId).subscribe(temp => {
      for (const item of temp) {
        item.selected = false;
      }
      this.columnThemArray = temp;
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
    console.log(this.thumbnailsMe);
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
    console.log(this.thumbnailsThem);
  }

}
