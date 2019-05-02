import { Component, OnInit } from '@angular/core';
import { TradeItem } from '../../models/TradeItem';

@Component({
  selector: 'app-item-card-stack',
  templateUrl: './item-card-stack.component.html',
  styleUrls: ['./item-card-stack.component.sass']
})
export class ItemCardStackComponent implements OnInit {
  items:TradeItem[];

  constructor() { }

  ngOnInit() {
  }

}
