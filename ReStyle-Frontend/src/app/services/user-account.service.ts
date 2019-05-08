import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserAccountService {

  constructor(private http: HttpClient) { }

  postUserData(): Observable<any> {
    // test sending data via post request body to the server
    return this.http.post<any>('/api/users', 
    {
      'uid': 'VPTnlsJHFldNgshbw7M8GcZiZqH3', 
      'swapScore': 1, 
      'displayName': 'Haejoon', 
      'picturePath': null
    });
  }

}
