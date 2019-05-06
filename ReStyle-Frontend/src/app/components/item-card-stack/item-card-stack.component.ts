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
  items: ItemCard[];

  constructor(private itemCardServiceService: ItemCardServiceService, private router: Router) { }

  ngOnInit() {
    const temp: any[] = this.itemCardServiceService.getItems();
    for (const card of temp) {
      card.pass = false;
      card.trade = false;
    }
    this.items = temp;
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
