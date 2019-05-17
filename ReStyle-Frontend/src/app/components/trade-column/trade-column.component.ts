import { Component, OnInit, Input } from '@angular/core';
import { TradeItem } from 'src/app/models/TradeItem';

@Component({
  selector: 'app-trade-column',
  templateUrl: './trade-column.component.html',
  styleUrls: ['./trade-column.component.sass']
})
export class TradeColumnComponent implements OnInit {
  @Input() items: TradeItem[]; // for getting the items

  constructor() { }

  ngOnInit() {
  }

}
