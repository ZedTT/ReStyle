import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TradeService {

  constructor() { }

  getItemsByUser(user: string) {
    return [
      {
        itemId: 'i',
        userId: user,
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
        itemId: 'k',
        userId: user,
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
