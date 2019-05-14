import { Injectable } from '@angular/core';
import { AddedItemInterface } from '../models/AddedItemInterface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AddItemService {

  constructor(private http: HttpClient) { }

  submitNewItem(title, description, selectedFile) {
    const fd = new FormData();
    fd.append('image', selectedFile);
    fd.append('title', title);

    console.log('FormData: ');
    console.log(fd);
    console.log(fd.get('image'));

    console.log('The file: ');
    console.log(selectedFile);

    const anItem: AddedItemInterface = {
      ownerId : 'l15CGtMJ5bSnEkRPpYEgyvVWeLt2',
      title,
      description,
      gender : 'Female',
      size: 1,
      category : 'category',
      photos : [fd]
    };

    this.http.post('/api/items', anItem)
      .subscribe(res => {
      console.log(res);
    });
  }
}
