import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-trade-request-thumbnail',
  templateUrl: './trade-request-thumbnail.component.html',
  styleUrls: ['./trade-request-thumbnail.component.sass']
})
export class TradeRequestThumbnailComponent implements OnInit {
  @Input() picture: string;

  constructors() { }

  ngOnInit() {
  }

  getImage() {
    return { 'background-image': `url(/images/${this.picture})` };
  }

}
