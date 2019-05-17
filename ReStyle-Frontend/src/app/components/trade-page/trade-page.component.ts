import { Component, OnInit, Input } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { TradeItem } from '../../models/TradeItem';
import { TradeService } from '../../services/trade.service';

@Component({
  selector: 'app-trade-page',
  templateUrl: './trade-page.component.html',
  styleUrls: ['./trade-page.component.sass']
})
export class TradePageComponent implements OnInit {
  queryParams: { you: string, item: string };
  itemId: string;
  youId: string;
  thumbnailsMe: TradeItem[];
  thumbnailsThem: TradeItem[];
  columnMe: TradeItem[];
  columnThem: TradeItem[];

  constructor(private router: Router, private tradeService: TradeService) { }

  ngOnInit() {
    // Url will look like /trade?you=QqJVsgMeiVcF1bW0x9b28sHK9fh2&item=1
    // We will parse out the query params from the url
    // This will give us { you: "QqJVsgMeiVcF1bW0x9b28sHK9fh2", item: "1" }
    const qParams = this.router.parseUrl(this.router.url).queryParams;
    this.queryParams = { you: qParams.you, item: qParams.item };
    this.itemId = this.queryParams.item;
    this.youId = this.queryParams.you;

    // this.getColumnThem();
  }

  getColumnMe() {

  }

  getColumnThem() {
    this.tradeService.getItemsByUser(this.youId).subscribe(temp => {
      for (const item of temp) {
        item.selected = false;
      }
      this.columnThem = temp;
      console.log(this.columnThem);
    });
  }

}
