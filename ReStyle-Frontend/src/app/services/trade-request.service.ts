import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TradeRequestService {

  constructor(private http:HttpClient) { }

  /**
   * For getting trade requests array that represent the trade reqeusts sent to the user.
   * @param userID the userID of the user.
   * @returns an observable that, when subscribed to, returns an array of trade requests
   */
  getTradeRequestsByUser(userID: string): Observable<any> { // TODO: please rename 'user' to 'userId'
    // if (!user) { return null; }
    return this.http.get<any>(`/api/traderequests?uid=${userID}`);
  }

}
