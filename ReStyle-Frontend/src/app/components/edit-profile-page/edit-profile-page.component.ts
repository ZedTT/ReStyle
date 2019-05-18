import { Component, OnInit } from '@angular/core';
import { firebase } from 'firebaseui-angular';
import { UserDetailsInterface } from '../../models/UserDetailsInterface';
import { EditProfileService } from '../../services/edit-profile.service';

@Component({
  selector: 'app-edit-profile-page',
  templateUrl: './edit-profile-page.component.html',
  styleUrls: ['./edit-profile-page.component.sass']
})

export class EditProfilePageComponent implements OnInit {

  imgURL: any = 'https://i.imgur.com/H9hqFVV.jpg';
  selectedFile: File;
  displayname: string;
  phone: string;
  email: string;
  city: string;
  postalcode: string;
  preferredContact: string;

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

    const uid = firebase.auth().currentUser.uid;

    if (!uid) { return null; }

    const newItem: UserDetailsInterface = {
      displayname : this.displayname,
      phone : this.phone,
      email : this.email,
      postalcode : this.postalcode,
      city : this.city,
      preferredContact : this.preferredContact,
      profilePic : this.selectedFile
    };

    this.editProfileService.submitEditedProfile(newItem);
  }

}
