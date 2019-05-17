import { Component, OnInit, Input } from '@angular/core';
import { TradeItem } from '../../models/TradeItem';

@Component({
  selector: 'app-trade-preview',
  templateUrl: './trade-preview.component.html',
  styleUrls: ['./trade-preview.component.sass']
})
export class TradePreviewComponent implements OnInit {
  @Input() inputThumbnails: TradeItem[]; // for getting the items
  thumbnails: TradeItem[];

  constructor() { }

  ngOnInit() {
  }

}
