import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { TradeItem } from '../models/TradeItem';

@Injectable({
  providedIn: 'root'
})
export class TradeService {

  constructor(private http: HttpClient) { }

  /**
   * For getting tradeItem objects that represent the items owned by the user.
   * @param userID the userID of the user.
   * @returns an observable that, when subscribed to, returns an array of tradeItems
   */
  getItemsByUser(userID: string): Observable<any> { // TODO: please rename 'user' to 'userId'
    // if (!user) { return null; }
    return this.http.get<any>(`/api/tradeitems?uid=${userID}`);
  }

  requestTrade(
    requesterId, notifiedUserId,
    requesterTradeItems, notifiedUserTradeItems
    ) {
    // console.log('TRADE REQUEST', {
    //   requesterId,
    //   notifiedUserId,
    //   requesterTradeItems,
    //   notifiedUserTradeItems
    // });
    this.http.post<any>('/api/tradeitems', {
      requesterId,
      notifiedUserId,
      requesterTradeItems,
      notifiedUserTradeItems
    }).subscribe(res => {
      console.log(res);
    });
    // {
    //   "requesterId": "nsisodvqeNOTDCitaseopWjovEJ2",
    //   "notifiedUserId": "rCjzKDG6rjUwjj6I5BepsLbvgPr1",
    //   "requesterTradeItems": [
    //       4,
    //       6
    //   ],
    //   "notifiedUserTradeItems": [
    //       20,
    //       19
    //   ]
    // }
  }

}
