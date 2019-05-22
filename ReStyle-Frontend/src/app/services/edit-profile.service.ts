import { Injectable } from '@angular/core';
import { UserDetailsInterface } from '../models/UserDetailsInterface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EditProfileService {

  constructor(private http: HttpClient) { }

  submitEditedProfile(newItem: UserDetailsInterface): Observable<any> {
    const fd = new FormData();
    fd.append('userId', newItem.userId);
    fd.append('displayname', newItem.displayname);
    fd.append('phone', newItem.phone);
    fd.append('email', newItem.email);
    fd.append('postalcode', newItem.postalcode);
    fd.append('city', newItem.city);
    fd.append('preferredContact', newItem.preferredContact);
    fd.append('profilePic', newItem.profilePic);

    return this.http.post('/api/userdetails', fd);
  }
}
