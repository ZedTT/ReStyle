import { Component, OnInit, NgZone } from '@angular/core';
import { TradeRequest } from '../../models/TradeRequest';
import { TradeRequestService } from '../../services/trade-request.service';
import { firebase } from 'firebaseui-angular';

@Component({
  selector: 'app-trade-requests-page',
  templateUrl: './trade-requests-page.component.html',
  styleUrls: ['./trade-requests-page.component.sass']
})
export class TradeRequestsPageComponent implements OnInit {
  acceptStatus = 'Accept'; // a keyword for accept status in the database, should not be changed
  rejectStatus = 'Reject'; // a keyword for reject status in the database, should not be changed
  requests: TradeRequest[];
  // requests: TradeRequest[] = [
  //   {
  //     tradeRequestId: 1,
  //     requesterId: 'a1',
  //     requesterUserPicturePath: 'path1',
  //     requesterName: 'Name1',
  //     notifiedItemsPicturePath: ['path-NA1', 'path-NA2'],
  //     requesterItemsPicturePath: ['path-RE2', 'pathB2']
  //   },
  //   {
  //     tradeRequestId: 2 ,
  //     requesterId: 'a2',
  //     requesterUserPicturePath: 'path2',
  //     requesterName: 'Name2',
  //     notifiedItemsPicturePath: ['path-NB1', 'pathB-N2'],
  //     requesterItemsPicturePath: ['path-RE2', 'pathB21']
  //   },
  //   {
  //     tradeRequestId: 3,
  //     requesterId: 'a3',
  //     requesterUserPicturePath: 'path3',
  //     requesterName: 'Name3',
  //     notifiedItemsPicturePath: ['path-NC1', 'path-NC2'],
  //     requesterItemsPicturePath: ['path-RE2', 'pathB2']
  //   }
  // ];

  constructor(private tradeRequestService: TradeRequestService, private ngZone: NgZone) { }

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
    // console.log(tradeRequest)
    this.tradeRequestService.postTradeRequestStatus(tradeRequest.trade_requestid, this.acceptStatus).subscribe(temp => {
      console.log(temp)
    })
  }

  /**
   * Sets a 'Reject' status for a trade request in a database.
   * 
   * @param tradeRequest a trade request instance which status should be updated
   */
  rejectTradeRequest(tradeRequest: TradeRequest) {
    // console.log(tradeRequest)
    this.tradeRequestService.postTradeRequestStatus(tradeRequest.trade_requestid, this.rejectStatus).subscribe(temp => {
      console.log(temp)
    })
  }

}
