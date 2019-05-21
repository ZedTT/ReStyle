import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TradeRequest } from 'src/app/models/TradeRequest';

@Component({
  selector: 'app-trade-request',
  templateUrl: './trade-request.component.html',
  styleUrls: ['./trade-request.component.sass']
})
export class TradeRequestComponent implements OnInit {
  @Input() request: TradeRequest;

  @Output() acceptRequest: EventEmitter<TradeRequest> = new EventEmitter();
  @Output() rejectRequest: EventEmitter<TradeRequest> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  getUserImage() {
    return { 'background-image': `url(/images/${this.request.requesterpicturepath})` };
  }

  setArraySizeClass(len) {
    const classes = {
      'len-one': (len < 2),
      'len-four': (len < 5 && len >= 2),
      'len-nine': (len >= 5),
    };
    return classes;
  }

  /**
   * Triggered when a user clicks
   * Accept trade request button on a trade request card.
   */
  onAccept() {
    this.acceptRequest.emit(this.request);
  }

  /**
   * Triggered when a user clicks
   * Reject trade request button on a trade request card.
   */
  onReject() {
    this.rejectRequest.emit(this.request);
  }

}
