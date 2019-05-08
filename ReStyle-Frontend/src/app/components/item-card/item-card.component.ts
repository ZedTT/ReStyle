import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ItemCard } from '../../models/ItemCard';
import { ItemCardServiceService } from '../../services/item-card-service.service';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.sass']
})
export class ItemCardComponent implements OnInit {
  @Input() item: ItemCard; // for getting the items
  /**
   * Output used to call the onPass function in the item card stack ts
   */
  @Output() passItem: EventEmitter<ItemCard> = new EventEmitter();
  @Output() tradeItem: EventEmitter<ItemCard> = new EventEmitter();

  sizeArray: string[] = ['xs', 's', 'm', 'l', 'xl'];

  /**
   * Creates an instance of an item card component.
   * @param itemCardServiceService used to communicate with the back end
   */
  constructor(private itemCardServiceService: ItemCardServiceService) {
  }

  ngOnInit() {
    this.setClasses();
    this.item.pass = false;
  }

  /**
   * Sets dynamic classes
   * @returns the classes that need to be set by angular
   * When the value of an attribute changes, the class is automatically set.
   * For example, when the value of this.item.pass changes from false to true,
   * the 'slide-out-left' class is automatically added.
   */
  setClasses() {
    const classes = {
      item: true,
      card: true,
      size: this.sizeArray[this.item.size], // proof of concept, may not actually be useful.
      // Changes the class attribute (html class="") based on the size of the item.
      'slide-out-left': this.item.pass,
      'slide-out-right': this.item.trade
    };

    return classes;
  }

  /**
   * Retrieves json from the server
   * ! This is an example and should not be kept long term
   */
  retrieveJSON() {
    /**
     * Logs the observable returned by the item card service's test server method without subscribing to it.
     * This shows what we get if we don't subscribe.
     */
     console.log(this.itemCardServiceService.testServer());
     /**
      * * Logs the JSON returned from the back end.
      * By subscribing to the observable,
      * we should get updated whenever there is a change.
      */
     this.itemCardServiceService.testServer().subscribe(JSON => {
       console.log(JSON);
     });
  }

  /**
   * Is called when the trade button is clicked on a card.
   * See item-card.component.html for the code that causes this function to be called
   * Emits the ItemCard object that represents the item that was clicked.
   * this causes '(tradeItem)=tradeItem($event)' to fire
   * See item-card-stack.component.html
   * @param item the ItemCard object that is associated with the item that was clicked.
   * TODO: In the future, this should be used to take the user to the trade screen.
   */
  onTrade(item) {
    this.tradeItem.emit(item);
  }

  /**
   * Is called when the user clicks the 'pass' button on a card.
   * See item-card.component.html for the code that causes this function to be called
   * Emits the ItemCard object that represents the item that was clicked.
   * this causes '(passItem)=passItem($event)' to fire
   * See item-card-stack.component.html
   * @param item the ItemCard object that is associated with the item that was clicked.
   * TODO: Should tell the backend to update the database so that this item is never showed to the user again.
   */
  onPass(item: ItemCard) {
    this.passItem.emit(item);
  }

}
