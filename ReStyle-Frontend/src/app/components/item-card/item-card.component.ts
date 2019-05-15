import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ItemCard } from '../../models/ItemCard';
import { ItemCardServiceService } from '../../services/item-card-service.service';
import { firebase } from 'firebaseui-angular';
import { UserAccountService } from '../../services/user-account.service';

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
  // tempItemImage = 'url(\'https://de9luwq5d40h2.cloudfront.net/catalog/product/large_image/05_407044.jpg\')'; // css background image
  tempItemImage = 'url(/images/photo-1557884635385.jpeg)';
  tempUserImage = 'https://kempenfeltplayers.com/wp-content/uploads/2015/07/profile-icon-empty.png'; // img tag

  /**
   * Creates an instance of an item card component.
   * @param itemCardServiceService used to communicate with the back end
   */
  constructor(private itemCardServiceService: ItemCardServiceService, private userAccountService: UserAccountService) {
  }

  ngOnInit() {
    this.setClasses();
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
      card: false,
      size: this.sizeArray[this.item.size], // proof of concept, may not actually be useful.
      // Changes the class attribute (html class="") based on the size of the item.
      'slide-out-left': this.item.pass,
      'slide-out-right': this.item.trade
    };

    return classes;
  }

  getImage() {
    return {'background-image': `url(/images/${this.item.itemPicturePath[0]})`};
  }

  /**
   * Sends json to the server
   * ! This is an example and should not be kept long term
   */
  sendUserId() {
    /**
     * * Logs response returned from the back end.
     * Sends the current users uid and display name to the server
     */
    const currentUser = firebase.auth().currentUser;
    const uid = currentUser.uid;
    const userName = currentUser.displayName;

    console.log(this.userAccountService.postUserData(uid, userName));

    this.userAccountService.postUserData(uid, userName).subscribe(res => {
       console.log(res);
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
