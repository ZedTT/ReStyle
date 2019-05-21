import { Component, OnInit, NgZone } from '@angular/core';
import { TradeRequest } from '../../models/TradeRequest';
import { TradeRequestService } from '../../services/trade-request.service';
import { firebase } from 'firebaseui-angular'

@Component({
  selector: 'app-trade-requests-page',
  templateUrl: './trade-requests-page.component.html',
  styleUrls: ['./trade-requests-page.component.sass']
})
export class TradeRequestsPageComponent implements OnInit {
  requests: TradeRequest[] = [];

  constructor(private tradeRequestService: TradeRequestService, private ngZone: NgZone) { }

  ngOnInit() {
    firebase.auth().onAuthStateChanged(user => {
      this.ngZone.run(() => {
        this.tradeRequestService.getTradeRequestsByUser(user.uid).subscribe(temp => {
          this.requests = temp;
        });
      });
    });
  }

}
