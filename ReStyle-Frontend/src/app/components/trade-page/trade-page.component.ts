import { Component, OnInit, Input } from '@angular/core';
import { ItemCard } from 'src/app/models/ItemCard';
import { Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-trade-page',
  templateUrl: './trade-page.component.html',
  styleUrls: ['./trade-page.component.sass']
})
export class TradePageComponent implements OnInit {
  queryParams: { user: string, item: string };
  itemId: string;
  userId: string;

  constructor(private router: Router) { }

  ngOnInit() {
    console.log(this.router.url);
    console.log(this.router.parseUrl(this.router.url).queryParams);
    const temp = this.router.parseUrl(this.router.url).queryParams;
    this.queryParams = { user: temp.user, item: temp.item };
    console.log(this.queryParams);
  }

}
