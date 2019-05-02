import { Component, OnInit } from '@angular/core';
import { TradeItem } from '../../models/TradeItem';
import { ItemCardServiceService } from '../../services/item-card-service.service';

@Component({
  selector: 'app-item-card-stack',
  templateUrl: './item-card-stack.component.html',
  styleUrls: ['./item-card-stack.component.sass']
})
export class ItemCardStackComponent implements OnInit {
  items:TradeItem[];

  constructor(private itemCardServiceService: ItemCardServiceService) { }

  ngOnInit() {
    this.items = this.itemCardServiceService.getItems();
  }

}
