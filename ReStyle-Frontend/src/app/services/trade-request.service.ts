import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TradeRequest } from '../models/TradeRequest';

@Injectable({
  providedIn: 'root'
})
export class TradeRequestService {

  constructor(private http: HttpClient) { }

  /**
   * For getting trade requests array that represent the trade reqeusts sent to the user.
   * @param userID the userID of the user.
   * @returns an observable that, when subscribed to, returns an array of trade requests
   */
  getTradeRequestsByUser(userID: string): Observable<any> { // TODO: please rename 'user' to 'userId'
    // if (!user) { return null; }
    return this.http.get<any>(`/api/traderequests?uid=${userID}`);
  }

  /**
   * To post a new status for a trade request.
   * 
   * @param tradeRequestId an id of a trade request which status is going to be updated
   * @param status a string that indicates a status, can be either 'Accept' or 'Reject'
   */
  postTradeRequestStatus(tradeRequest: TradeRequest, status: string) {
    if (status === 'Accept' || status === 'Reject') {
      return this.http.post<any>(`/api/traderequests`, { tradeRequest: tradeRequest, status: status });
    } else {
      console.log(`A status ${status} for the trade request is not valid. Only 'Accept' or 'Reject' are accepted.`);
    }
  }

}
