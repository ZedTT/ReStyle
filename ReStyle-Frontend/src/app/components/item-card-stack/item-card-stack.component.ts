import { Component, OnInit, NgZone } from '@angular/core';
import { ItemCard } from '../../models/ItemCard';
import { ItemCardServiceService } from '../../services/item-card-service.service';
import { Router } from '@angular/router';
import { firebase } from 'firebaseui-angular';

@Component({
  selector: 'app-item-card-stack',
  templateUrl: './item-card-stack.component.html',
  styleUrls: ['./item-card-stack.component.sass']
})
export class ItemCardStackComponent implements OnInit {
  items: ItemCard[]; // The array of item cards that will be displayed on the page
  authenticated: boolean;
  userId: string; // The id of currently logged in user

  /**
   * Constructor.
   * @param itemCardServiceService Used for getting the item cards that will be displayed in ngOnInit()
   * @param router Used to navigate to the trade page in tradeItem()
   */
  constructor(private itemCardServiceService: ItemCardServiceService, private router: Router, private ngZone: NgZone) { }

  ngOnInit() {
    // Call grabItemsFromService once on page load
    this.grabItemsFromService(null);

    // Set up a listener to call grabItemsFromService again with a new user whenever auth state changes
    // TODO: refactor to be part of homepage along with the itemcards firebase
    firebase.auth().onAuthStateChanged(updatedUser => {
      this.ngZone.run(() => {
        this.userId = updatedUser ? updatedUser.uid : null;
        this.grabItemsFromService(updatedUser);
        this.authenticated = !!updatedUser;
      });
    });
  }

  grabItemsFromService(user) {
    this.itemCardServiceService.getItems(user).subscribe(temp => {
      /**
       * Add pass and trade attributes to each item in the array.
       * * These attributes are only used for animations on the front end.
       * ? See the documentation for models/ItemCard
       */
      for (const card of temp) {
        card.pass = false;
        card.trade = false;
      }
      this.items = temp; // assign the array to the items array
    });
  }

  /**
   * Pass item
   * Sets the pass attribute of the item to true, this causes the class to be set to slide the item.
   * @param item the item to be passed. Emitted from item-card.component.ts
   */
  passItem(item: ItemCard) {
    console.log(item);
    item.pass = true;
    // Remove the item from the list so that there isn't a blank space in the scrolling space.
    setTimeout(() => {
      this.items = this.items.filter(i => i.itemId !== item.itemId);
    }, 1000);
    // Post an item to the hidden items list into db.
    if (this.authenticated && this.userId) {
      this.itemCardServiceService.postHiddenItem(this.userId, item.itemId).subscribe(temp => {
        console.log(temp);
      });
    } else {
      setTimeout(() => {
        this.router.navigate(['/login']); // TODO: save where the user was
      }, 1000);
    }
  }

  /**
   * Trades item.
   * Sets the trade attribute of the item to true, this causes the class to be set to slide the item.
   * @param item the item to be traded. Emitted from the item-card.component.ts
   */
  tradeItem(item: ItemCard) {
    console.log(item);
    item.trade = true;
    setTimeout(() => {
      if (this.authenticated) {
        this.router.navigate(['/trade'], { queryParams: { you: item.userId, item: item.itemId } });
      } else {
        this.router.navigate(['/login']); // TODO: save where the user was
      }
    }, 1000);
  }

}
