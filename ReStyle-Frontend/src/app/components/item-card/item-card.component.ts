import { Component, OnInit, Input } from '@angular/core';
import { TradeItem } from '../../models/TradeItem';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.css']
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

  onTrade() {
    console.log("Trade item: " + this.item.itemId);

    // Fetching the parent card and swiping it right
    var parent = <HTMLElement>( <HTMLElement>event.target).parentNode.parentNode.parentNode.parentNode;
    console.log(parent);
    parent.classList.add("slide-out-right");
  }

  onPass() {
    console.log("Pass item: " + this.item.itemId);

    // Fetching the parent card and hiding it
    var parent = <HTMLElement>( <HTMLElement>event.target).parentNode.parentNode.parentNode.parentNode;
    console.log(parent);
    parent.classList.add("slide-out-left");
  }

}
