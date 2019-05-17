import { Component, OnInit, Input } from '@angular/core';
import { TradeItem } from '../../models/TradeItem';

@Component({
  selector: 'app-trade-item',
  templateUrl: './trade-item.component.html',
  styleUrls: ['./trade-item.component.sass']
})
export class TradeItemComponent implements OnInit {
  @Input() item: TradeItem; // for getting the item

  constructor() { }

  ngOnInit() {
  }

}
