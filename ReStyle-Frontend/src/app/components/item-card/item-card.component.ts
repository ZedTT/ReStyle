import { Component, OnInit, Input } from '@angular/core';
import { TradeItem } from '../../models/TradeItem';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.sass']
})
export class ItemCardComponent implements OnInit {
  @Input() item: TradeItem; // for getting the items

  sizeArray: string[] = ['xs', 's', 'm', 'l', 'xl'];

  constructor() { }

  ngOnInit() {
    this.setClasses();
  }

  // Set Dynamic Classes
  setClasses() {
    let classes = {
      item: true,
      size: this.sizeArray[this.item.size], // proof of concept, may not actually be useful. Changes the class attribute (html class="") based on the size of the item.
    }

    return classes;
  }

}
