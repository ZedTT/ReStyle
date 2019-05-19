import { Component, OnInit, Input, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { TradeItem } from '../../models/TradeItem';

@Component({
  selector: 'app-trade-item',
  templateUrl: './trade-item.component.html',
  styleUrls: ['./trade-item.component.sass']
})
export class TradeItemComponent implements OnInit {
  @Input() item: TradeItem; // for getting the item
  @Output() toggleItemOutput: EventEmitter<TradeItem> = new EventEmitter(); // for passing the item to column component when toggled

  constructor(private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.setClasses();
  }

  /**
   * * Sets dynamic classes
   * See the HTML [ngClasses]="setClasses()"
   *
   * Selected: if the item is currently selected or not.
   * tradeItem: unused.
   *
   * @returns An object representing what classes should be set by angular.
   */
  setClasses() {
    const classes = {
      selected: this.item.selected,
      'trade-item': true
    };
    return classes;
  }

  /**
   * Used by ngStyle in the html for this component
   * Returns an object that is set as inline style for the image
   * Includes a background image whose url points to the image for the trade item
   * @returns an object to be used by ngStyle including a background image
   */
  getImage() {
    return { 'background-image': `url(/images/${this.item.picturePath[0]})` };
  }

  toggleSelected() {
    // Invert the value of boolean item.selected.
    this.item.selected = !this.item.selected;
    // A bandaid. Only needed on the 'me' column inexplicably
    // without it, the classes do not properly update in the dom
    // May no longer be needed due to use of ngZone in tradePage
    // * this.changeDetectorRef.detectChanges();
    // Pass the item that was just toggled so that we can add it to or remove it from the preview thumbnails
    this.toggleItemOutput.emit(this.item);

    // * Logs for debug
    // console.log('Item', this.item);
  }

}
