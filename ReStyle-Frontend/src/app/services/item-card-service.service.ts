import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ItemCardServiceService {

  constructor() { }

  // Get Items
  // The items could be formatted from DB style to front end style in the front-end, but it would make more sense to do this in the back-end.
  getItems() {
    // return hard coded data for testing
    return [
      {
        itemId: 'i',
        userId: 'u',
        title: 'test shirt',
        size: 3,
        brand: 'gucci',
        description: 'lorem ipsum dolor sit amet',
        picturePath: ['/path1', '/path2', 'path3']
      },
      {
        itemId: 'j',
        userId: 'v',
        title: 'test pants',
        size: 2,
        brand: 'levi',
        description: 'lorem ipsum dolor sit amet',
        picturePath: ['/path1', '/path2', 'path3']
      }
    ]
  }
}
// For reference during development. Can be removed
// itemId: string; // a unique id to identify this item
// userId: string; // the id of the user that owns this item
// title: string; // the name of the item
// size: number; // the size, 0: XS, 1: S, 2: M, 3: L, 4: XL
// brand: string; // the brand that manufactured this item
// description: string; // the description of the item
// picturePath: string[]; // an array of paths to the pictures that are displayed for this item
