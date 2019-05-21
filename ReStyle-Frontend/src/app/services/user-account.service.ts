import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserAccountService {

  constructor(private http: HttpClient) { }

  postUserData(uid, userName): Observable<any> {
    // test sending data via post request body to the server
    return this.http.post<any>('/api/users',
    {
      'uid': uid,
      'userName': userName
    }); // ? Does this still work if we fix the tsLint issues?
  }

  getUserData(uid: string): Observable<any> {
    // // handle both uid and user object inputs
    // if (uid.uid) {
    //   uid = uid.uid;
    // }
    // get a specific user's data given current uid
    return this.http.get<any>(`/api/users?uid=${uid}`);
  }

  getUserDetail(uid: string): Observable<any> {
    // get a specific user's detailed information given current uid
    return this.http.get<any>(`/api/userdetails?uid=${uid}`);
  }

}
