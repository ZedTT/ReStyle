import { Component, OnInit, Input, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { TradeItem } from 'src/app/models/TradeItem';

@Component({
  selector: 'app-trade-column',
  templateUrl: './trade-column.component.html',
  styleUrls: ['./trade-column.component.sass']
})
export class TradeColumnComponent implements OnInit {
  @Input() items: TradeItem[]; // for getting the items
  @Output() toggleItemOutput: EventEmitter<TradeItem> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  toggleItem(item) {
    // take the item that was passed from the trade item component and relay it up to the trade page
    this.toggleItemOutput.emit(item);
    console.log('Column', item);
  }

}
