import { Component, OnInit, Input } from '@angular/core';
import { TradeRequest } from 'src/app/models/TradeRequest';

@Component({
  selector: 'app-trade-request',
  templateUrl: './trade-request.component.html',
  styleUrls: ['./trade-request.component.sass']
})
export class TradeRequestComponent implements OnInit {
  @Input() request: TradeRequest;

  constructor() { }

  ngOnInit() {
  }

  getUserImage() {
    return { 'background-image': `url(/images/${this.request.requesterpicturepath})` };
  }

  setArraySizeClass(len) {
    const classes = {
      'len-one': (len < 2),
      'len-four': (len < 5),
      'len-nine': (len >= 5),
    };
    return classes;
  }

}
