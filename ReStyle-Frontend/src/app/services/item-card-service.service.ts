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
  getItems() {
    // return hard coded data for testing
    return [
      {
        itemId: 'i',
        userId: 'u',
        userPicturePath: '/path',
        verified: true,
        rating: 5,
        title: 'test shirt',
        size: 3,
        category: 'shirt',
        description: 'lorem ipsum dolor sit amet',
        picturePath: ['/path1', '/path2', '/path3'],
        bookmarked: false
      },
      {
        itemId: 'j',
        userId: 'v',
        userPicturePath: '/path',
        verified: false,
        rating: 4,
        title: 'test pants',
        size: 2,
        category: 'pants',
        description: 'lorem ipsum dolor sit amet',
        picturePath: ['/path1', '/path2', '/path3'],
        bookmarked: true
      }
    ];
  }
}
// For reference during development. Can be removed
// itemId: string; // a unique id to identify this item
// userId: string; // the id of the user that owns this item
// userPicturePath: string; // the path to the profile picture of the user who owns the item
// verified: boolean; // indicates if the user is verified
// rating: number; // the rating of the user who owns the item
// title: string; // the name of the item
// size: number; // the size, 0: XS, 1: S, 2: M, 3: L, 4: XL
// category: string; // the brand that manufactured this item
// description: string; // the description of the item
// picturePath: string[]; // an array of paths to the pictures that are displayed for this item
