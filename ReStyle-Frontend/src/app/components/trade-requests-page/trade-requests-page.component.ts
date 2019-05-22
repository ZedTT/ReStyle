import { Component, OnInit, NgZone, Inject } from '@angular/core';
import { TradeRequest } from '../../models/TradeRequest';
import { TradeRequestService } from '../../services/trade-request.service';
import { firebase } from 'firebaseui-angular';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-trade-requests-page',
  templateUrl: './trade-requests-page.component.html',
  styleUrls: ['./trade-requests-page.component.sass']
})
export class TradeRequestsPageComponent implements OnInit {
  acceptStatus = 'Accept'; // a keyword for accept status in the database, should not be changed
  rejectStatus = 'Reject'; // a keyword for reject status in the database, should not be changed
  requests: TradeRequest[];

  animal: string;
  name: string;

  constructor(private tradeRequestService: TradeRequestService,
  private ngZone: NgZone, public dialog: MatDialog,
  private confirmationDialogComponent: ConfirmationDialogComponent) { }

  /**
   * Confirm if the user actually wants to accept or reject the trade request.
   *
   * @param tradeRequest a trade request instance which status should be updated
   */
  openDialog(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '250px',
      data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

  ngOnInit() {
    firebase.auth().onAuthStateChanged(user => {
      this.ngZone.run(() => {
        this.tradeRequestService.getTradeRequestsByUser(user.uid).subscribe(temp => {
          console.log(temp);
          this.requests = temp;
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
    this.openDialog();
    // console.log(tradeRequest)
    this.tradeRequestService.postTradeRequestStatus(tradeRequest.trade_requestid, this.acceptStatus).subscribe(temp => {
      console.log(temp);
      this.requests = this.requests.filter(r => r.trade_requestid !== tradeRequest.trade_requestid);
    });
  }

  /**
   * Sets a 'Reject' status for a trade request in a database.
   *
   * @param tradeRequest a trade request instance which status should be updated
   */
  rejectTradeRequest(tradeRequest: TradeRequest) {
    this.openDialog();
    // console.log(tradeRequest)
    this.tradeRequestService.postTradeRequestStatus(tradeRequest.trade_requestid, this.rejectStatus).subscribe(temp => {
      console.log(temp);
      this.requests = this.requests.filter(r => r.trade_requestid !== tradeRequest.trade_requestid);
    });
  }

}
