import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemCardServiceService {

  // an http client called http, used to get data from the back end
  constructor(private http: HttpClient) { }

  /**
   * An example of retrieving json from the back end.
   * Because this is an observable, it needs to be subscribed to.
   * Using the .subscribe() method.
   * * .subscribe(val => {console.log(val)});
   * @returns an observable that, when subscribed to, returns json.
   */
  testServer(): Observable<any> {
    // test response from server
    return this.http.get<any>('/ajax');
  }

  // Get Items
  // The items could be formatted from DB style to front end style in the front-end,
  // but it would make more sense to do this in the back-end.
  getItems(): Observable<any> {
    const res = this.http.get<any>('/api/items');
    return res;
  }
}

