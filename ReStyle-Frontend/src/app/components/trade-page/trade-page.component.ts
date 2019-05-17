import { Component, OnInit, Input } from '@angular/core';
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
  queryParams: { them: string, item: string };
  itemId: string; // the id of the item whose 'trade' button was clicked
  themId: string; // the id of the user with whom a trade was initialized
  thumbnailsMe: TradeItem[]; // the list of items that belong to the requester that are currently selected for trading
  thumbnailsThem: TradeItem[]; // the list of items that belong to the notified user that are currently selected for trading
  columnMeArray: TradeItem[]; // the list of items that belong to the user who initialized a trade
  columnThemArray: TradeItem[]; // the list of items that belong to the user with whom a trade was initialized

  /**
   * Creates an instance of trade page component.
   * Initializes a router and tradeService to be used on the page
   * @param router used to grab the query params from the url
   * @param tradeService used to get the items to display
   */
  constructor(private router: Router, private tradeService: TradeService) { }

  ngOnInit() {
    // Url will look like /trade?you=QqJVsgMeiVcF1bW0x9b28sHK9fh2&item=1
    // We will parse out the query params from the url
    // This will give us { you: "QqJVsgMeiVcF1bW0x9b28sHK9fh2", item: "1" }
    const qParams = this.router.parseUrl(this.router.url).queryParams;
    this.queryParams = { them: qParams.you, item: qParams.item };
    this.itemId = this.queryParams.item;
    this.themId = this.queryParams.them;

    /**
     * Use firebase to detect uid
     */
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.getColumnMe(user.uid);
      }
    });

    this.getColumnThem();
  }

  getColumnMe(user) {
    this.tradeService.getItemsByUser(user).subscribe(temp => {
      for (const item of temp) {
        item.selected = false;
      }
      this.columnMeArray = temp;
      console.log('getColumnMe');
      console.log(user);
      console.log(this.columnMeArray);
    });
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
      console.log(this.columnThemArray);
    });
  }

}
