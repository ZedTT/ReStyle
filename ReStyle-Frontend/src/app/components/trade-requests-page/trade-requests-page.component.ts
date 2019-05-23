import { Component, OnInit, NgZone } from '@angular/core';
import { TradeRequest } from '../../models/TradeRequest';
import { TradeRequestService } from '../../services/trade-request.service';
import { firebase } from 'firebaseui-angular';
import { ConfirmationBoxComponent } from '../confirmation-box/confirmation-box.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-trade-requests-page',
  templateUrl: './trade-requests-page.component.html',
  styleUrls: ['./trade-requests-page.component.sass']
})
export class TradeRequestsPageComponent implements OnInit {
  acceptStatus = 'Accept'; // a keyword for accept status in the database, should not be changed
  rejectStatus = 'Reject'; // a keyword for reject status in the database, should not be changed
  requests: TradeRequest[];
  isEmpty: boolean;

  constructor(
    private tradeRequestService: TradeRequestService,
    private ngZone: NgZone, // make firebase behave
    private dialog: MatDialog // for the dialog box
  ) { }

  ngOnInit() {
    firebase.auth().onAuthStateChanged(user => {
      this.ngZone.run(() => { // make firebase run in ng zone
        this.tradeRequestService.getTradeRequestsByUser(user ? user.uid : null).subscribe(temp => {
          // console.log(temp);
          this.requests = temp;
          this.isEmpty = this.requests.length < 1;
        });
      });
    });
  }

  /**
   * Sets an 'Accept' status for a trade request in a database.
   *
   * @param tradeRequest a trade request instance which status should be updated
   */
  acceptTradeRequest(tradeRequest: TradeRequest) {
    // * log for debug
    // console.log(tradeRequest)

    // open a confirmation dialog box with parameters
    const dialogRef = this.dialog.open(ConfirmationBoxComponent, {
      width: '250px',
      height: '200px',
      data: 'Are you sure you would like to accept this trade request?'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) { // only continue if true is returned
        this.tradeRequestService.postTradeRequestStatus(tradeRequest.trade_requestid, this.acceptStatus).subscribe(temp => {
          // console.log(temp);
          this.requests = this.requests.filter(r => r.trade_requestid !== tradeRequest.trade_requestid);
        });
      }
    });
  }

  /**
   * Sets a 'Reject' status for a trade request in a database.
   *
   * @param tradeRequest a trade request instance which status should be updated
   */
  rejectTradeRequest(tradeRequest: TradeRequest) {
    // console.log(tradeRequest)
    const dialogRef = this.dialog.open(ConfirmationBoxComponent, {
      width: '250px',
      height: '200px',
      data: 'Are you sure you would like to reject this trade request?'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.tradeRequestService.postTradeRequestStatus(tradeRequest.trade_requestid, this.rejectStatus).subscribe(temp => {
          // console.log(temp);
          this.requests = this.requests.filter(r => r.trade_requestid !== tradeRequest.trade_requestid);
        });
      }
    });
  }

}
