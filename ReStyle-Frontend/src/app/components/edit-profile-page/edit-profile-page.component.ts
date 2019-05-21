import { Component, OnInit } from '@angular/core';
import { firebase } from 'firebaseui-angular';
import { UserDetailsInterface } from '../../models/UserDetailsInterface';
import { EditProfileService } from '../../services/edit-profile.service';

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

  imgURL: any = 'https://i.imgur.com/H9hqFVV.jpg';
  selectedFile: File;
  sPref: string;
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

  constructor(private editProfileService: EditProfileService) { }

  ngOnInit() {
  }

  onSubmit() {

    this.uid = firebase.auth().currentUser.uid;
    this.email = firebase.auth().currentUser.email;

    if (!this.uid) {return null; }

    const newItem: UserDetailsInterface = {
      userId: this.uid,
      displayname: this.displayname,
      phone: this.phone,
      email: this.email,
      postalcode: this.postalcode,
      city: this.city,
      preferredContact: this.sPref,
      profilePic: this.selectedFile
    };

    this.editProfileService.submitEditedProfile(newItem);
  }

}