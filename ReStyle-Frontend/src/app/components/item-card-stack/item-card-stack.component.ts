import { Component, OnInit } from '@angular/core';
import { ItemCard } from '../../models/ItemCard';
import { ItemCardServiceService } from '../../services/item-card-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-item-card-stack',
  templateUrl: './item-card-stack.component.html',
  styleUrls: ['./item-card-stack.component.sass']
})
export class ItemCardStackComponent implements OnInit {
  items: ItemCard[]; // The array of item cards that will be displayed on the page

  /**
   * Constructor.
   * @param itemCardServiceService Used for getting the item cards that will be displayed in ngOnInit()
   * @param router Used to navigate to the trade page in tradeItem()
   */
  constructor(private itemCardServiceService: ItemCardServiceService, private router: Router) { }

  ngOnInit() {
    this.itemCardServiceService.getItems().subscribe(temp => {
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
      this.router.navigate(['/trade'], { queryParams: { user: item.userId, item: item.itemId } });
    }, 1000);
  }

}
