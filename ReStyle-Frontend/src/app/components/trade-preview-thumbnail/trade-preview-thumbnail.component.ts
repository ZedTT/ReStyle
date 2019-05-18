import { Component, OnInit, Input } from '@angular/core';
import { TradeItem } from '../../models/TradeItem';

@Component({
  selector: 'app-trade-preview-thumbnail',
  templateUrl: './trade-preview-thumbnail.component.html',
  styleUrls: ['./trade-preview-thumbnail.component.sass']
})
export class TradePreviewThumbnailComponent implements OnInit {
  @Input() thumbnail: TradeItem; // for getting the thumbnail

  constructor() { }

  ngOnInit() {
    console.log('Thumbnail init', this.thumbnail);
  }

}
