import { Component, OnInit, NgZone } from '@angular/core';
import { firebase } from 'firebaseui-angular';
import { UserDetailsInterface } from '../../models/UserDetailsInterface';
import { EditProfileService } from '../../services/edit-profile.service';
import { UserAccountService } from '../../services/user-account.service';

export interface PreferredContact {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-edit-profile-page',
  templateUrl: './edit-profile-page.component.html',
  styleUrls: ['./edit-profile-page.component.sass']
})

export class EditProfilePageComponent implements OnInit {

  imgURL: any = '/images/defaultAvatar.png';
  profilePic: string;
  selectedFile: File;
  sPref: string = null;
  displayname: string;
  phone: string;
  email: string;
  city: string;
  postalcode: string;
  preferredContact: string;
  uid: string;

  prefs: PreferredContact[] = [
    { value: 'Email', viewValue: 'Email' },
    { value: 'Phone', viewValue: 'Phone' }
  ];
  onFileSelected(fileEvent) {

    this.selectedFile = fileEvent.target.files[0] as File;

    // Displays a preview of the uploaded image
    const reader = new FileReader();
    reader.readAsDataURL(this.selectedFile);
    // tslint:disable-next-line: variable-name
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    };
  }

  constructor(private editProfileService: EditProfileService, private userAccountService: UserAccountService, private ngZone: NgZone) { }

  ngOnInit() {
    firebase.auth().onAuthStateChanged(user => {
      this.ngZone.run(() => {
        this.userAccountService.getUserDetail(user.uid).subscribe(temp => {
          this.imgURL = '/images/' + temp.profilePic;
          this.profilePic = temp.profilePic;
          this.displayname = temp.displayname;
          this.phone = temp.phone;
          this.city = temp.city;
          this.postalcode = temp.postalcode;
          this.sPref = temp.preferredContact;
        });
      });
    });
  }

  onSubmit() {

    this.uid = firebase.auth().currentUser.uid;
    this.email = firebase.auth().currentUser.email;

    if (!this.uid) {return null; }

    const newItem: UserDetailsInterface = {
      userId: this.uid,
      displayname: this.displayname.trim(),
      phone: this.phone,
      email: this.email.trim(),
      postalcode: this.postalcode,
      city: this.city.trim(),
      preferredContact: this.sPref,
      profilePic: this.selectedFile ? this.selectedFile : this.profilePic
    };

    this.editProfileService.submitEditedProfile(newItem);
  }

}
