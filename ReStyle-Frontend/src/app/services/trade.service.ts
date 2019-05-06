import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TradeService {

  constructor() { }

  /**
   * Returns tradeItem objects that represent the items owned by the user.
   * ! This currently returns static data only
   * ! If you want to use this to get the currently signed in users items,
   * ! Be very careful to grab that userID from a secure source, so people can't
   * ! use arbitrary userID's
   * TODO: make this not return static data.
   * @param user the userID of the user.
   */
  getItemsByUser(user: string) {
    return [
      {
        itemId: 'i',
        picturePath: ['/path1', '/path2', '/path3'],
        title: 'test shirt',
        size: 3,
        description: 'lorem ipsum dolor sit amet',
      },
      {
        itemId: 'k',
        picturePath: ['/path1', '/path2', '/path3'],
        title: 'test pants',
        size: 2,
        description: 'lorem ipsum dolor sit amet',
      }
    ];
  }
  // itemId: string; // a unique id to identify this item
  // picturePath: string[]; // an array of paths to the pictures that are displayed for this item
  // selected: boolean; // keeps track of if the item is selected for trading or not
  // title: string; // the name of the item
  // size: number; // the size, 0: XS, 1: S, 2: M, 3: L, 4: XL
  // description: string; // the description of the item
}
