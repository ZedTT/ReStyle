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
        itemPicturePath: ['/path1', '/path2', '/path3'],
        bookmarked: false,
        userId: 'u',
        userName: 'test user1',
        userPicturePath: '/path',
        userVerified: true,
        userRating: 5,
        title: 'test shirt',
        size: 3,
        category: 'shirt',
        description: 'lorem ipsum dolor sit amet',
      },
      {
        itemId: 'j',
        itemPicturePath: ['/path1', '/path2', '/path3'],
        bookmarked: true,
        userId: 'v',
        userName: 'test user2',
        userPicturePath: '/path',
        userVerified: false,
        userRating: 4,
        title: 'test pants',
        size: 2,
        category: 'pants',
        description: 'lorem ipsum dolor sit amet',
      }
    ];
  }
}
// itemId: string; // a unique id to identify this item
// itemPicturePath: string[]; // an array of paths to the pictures that are displayed for this item
// bookmarked: boolean; // true if the currently signed in user has bookmarked this trade item
// userId: string; // the id of the user that owns this item
// userName: string; // the name of the user
// userPicturePath: string; // the path to the profile picture of the user who owns the item
// userVerified: boolean; // indicates if the user is verified
// userRating: number; // the rating of the user who owns the item
// title: string; // the name of the item
// size: number; // the size, 0: XS, 1: S, 2: M, 3: L, 4: XL
// category: string; // the category that this item belongs to: "tops, bottoms, etc"
// description: string; // the description of the item
// /**
//   * True if the card has been passed.
//   * Only meant to be used by the front end for setting classes.
//   * The back end should never need to send this and it should default to false.
//   */
// pass: boolean;
// /**
//   * True if the user has just clicked 'trade' on this card.
//   * Used to set classes for css animations.
//   * The back end should never need to send this and it should default to false.
//   */
// trade: boolean;
