import { Injectable } from '@angular/core';
import { AddedItemInterface } from '../models/AddedItemInterface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AddItemService {

  constructor(private http: HttpClient) { }

  submitNewItem(newItem: AddedItemInterface) {
    const fd = new FormData();
    fd.append('ownerId', newItem.ownerId);
    fd.append('title', newItem.title);
    fd.append('description', newItem.description);
    fd.append('gender', newItem.gender);
    fd.append('size', `${newItem.size}`);
    fd.append('category', newItem.category);
    fd.append('photo', newItem.photos[0]); // photo not photos intentional

    this.http.post('/api/items', fd)
      .subscribe(res => {
      console.log(res);
    });


  }

  submitNewImage(selectedFile) {
  }

}
