import { Component, OnInit } from '@angular/core';
import { ItemCard } from '../../models/ItemCard';
import { ItemCardServiceService } from '../../services/item-card-service.service';

@Component({
  selector: 'app-item-card-stack',
  templateUrl: './item-card-stack.component.html',
  styleUrls: ['./item-card-stack.component.sass']
})
export class ItemCardStackComponent implements OnInit {
  items: ItemCard[];

  constructor(private itemCardServiceService: ItemCardServiceService) { }

  ngOnInit() {
    const temp: any[] = this.itemCardServiceService.getItems();
    for(const card of temp) {
      card.pass = false;
      card.trade = false;
    }
    this.items = temp;
  }

  passItem(item: ItemCard) {
    console.log(item);
    item.pass = true;
  }

  tradeItem(item: ItemCard) {
    console.log(item);
    item.trade = true;
  }

}
