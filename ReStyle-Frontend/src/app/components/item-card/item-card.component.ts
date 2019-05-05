import { Component, OnInit, Input } from '@angular/core';
import { ItemCard } from '../../models/ItemCard';
import { ItemCardServiceService } from '../../services/item-card-service.service';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.css']
})
export class ItemCardComponent implements OnInit {
  @Input() item: ItemCard; // for getting the items

  sizeArray: string[] = ['xs', 's', 'm', 'l', 'xl'];

  /**
   * Creates an instance of an item card component.
   * @param itemCardServiceService used to communicate with the back end
   */
  constructor(private itemCardServiceService: ItemCardServiceService) { }

  ngOnInit() {
    this.setClasses();
  }

  /**
   * Sets dynamic classes
   * @returns the classes that need to be set by angular
   */
  setClasses() {
    const classes = {
      item: true,
      size: this.sizeArray[this.item.size], // proof of concept, may not actually be useful.
      // Changes the class attribute (html class="") based on the size of the item.
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
   * TODO: In the future, this should be used to take the user to the trade screen.
   */
  onTrade() {
    console.log('Trade item: ' + this.item.itemId);

    // Fetching the parent card and swiping it right
    const parent =  (event.target as HTMLElement).parentNode.parentNode.parentNode.parentNode as HTMLElement;
    console.log(parent);
    parent.classList.add('slide-out-right');
  }

  onPass() {
    console.log('Pass item: ' + this.item.itemId);

    // Fetching the parent card and hiding it
    const parent =  (event.target as HTMLElement).parentNode.parentNode.parentNode.parentNode as HTMLElement;
    console.log(parent);
    parent.classList.add('slide-out-left');
  }

}
