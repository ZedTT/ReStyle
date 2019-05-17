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
   * * Gets item cards to display on the home page.
   * The items are formatted like ItemCard objects but missing the pass and trade attributes.
   * ? See item-card-stack.component.ts ngOnInit() for where the pass and trade attributes are added
   * ? Should we add those attributes here instead?
   * TODO: @param UID
   * Because this is an observable, it needs to be subscribed to.
   * Using the .subscribe() method.
   * * .subscribe(val => {console.log(val)});
   * @returns an observable that, when subscribed to, returns an array of ItemCard objects missing pass and trade attributes
   */
  getItems(user): Observable<any> {
    // console.log('getItems() is called with user object: ', user);
    const res = this.http.get<any>(`/api/items?uid=${(user) ? user.uid : null}`);
    return res;
  }
}

