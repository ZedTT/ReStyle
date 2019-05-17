import { Injectable } from '@angular/core';
import { UserDetailsInterface } from '../models/UserDetailsInterface';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class EditProfileService {

  constructor(private http: HttpClient) { }

  submitEditedProfile(newItem: UserDetailsInterface) {
    const fd = new FormData();
    fd.append('displayname', newItem.displayname);
    fd.append('phone', newItem.phone);
    fd.append('email', newItem.email);
    fd.append('postalcode', newItem.postalcode);
    fd.append('city', newItem.city);
    fd.append('preferredContact', newItem.preferredContact);
    fd.append('profilePic', newItem.profilePic);

    this.http.post('/api/userdetails', fd)
      .subscribe(res => {
      console.log(res);
    });
  }
}
