import { Component, OnInit, NgZone } from '@angular/core';
import { firebase } from 'firebaseui-angular';
import { UserDetailsInterface } from '../../models/UserDetailsInterface';
import { EditProfileService } from '../../services/edit-profile.service';
import { UserAccountService } from '../../services/user-account.service';
import { Router } from '@angular/router';
import { MatSnackBar, MatDialog } from '@angular/material';
import { ConfirmationBoxComponent } from '../confirmation-box/confirmation-box.component';

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

  constructor(
    private editProfileService: EditProfileService,
    private userAccountService: UserAccountService,
    private ngZone: NgZone,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) { }

  openSnackBar(message: string, actionMessage: string) {
    this.snackBar.open(message, actionMessage, {
      duration: 4000,
      verticalPosition: 'bottom'
    });
  }

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

    if (!this.uid) { return null; }

    const newInfo: UserDetailsInterface = {
      userId: this.uid,
      displayname: this.displayname.trim(),
      phone: this.phone,
      email: this.email.trim(),
      postalcode: this.postalcode.toUpperCase(),
      city: this.city.trim(),
      preferredContact: this.sPref,
      profilePic: this.selectedFile ? this.selectedFile : this.profilePic
    };

    // TODO: create variables for patterns and use them in .html and .ts files
    const validDisplayName = this.displayname.match('[A-Za-z0-9 ]{3,20}');
    const validPhoneNumber = this.phone.length === 0 || this.phone.match('[0-9]{10}');
    const validCity = this.city.match('[A-Za-z ]{3,20}');
    const validPostalcode = this.postalcode.length === 0 || this.postalcode.match('[A-Za-z0-9]{6}');
    const validPreferredContact = !!this.sPref;

    // check that everything is valid
    if (!(validDisplayName && validPhoneNumber && validCity && validPostalcode && validPreferredContact)) {
      // if not valid, open snack bar
      this.openSnackBar('Please fill in all fields correctly!', 'Dismiss');
      // break
      return null;
    } else {
      // if not not valid (valid)
      // open dialog box
      const dialogRef = this.dialog.open(ConfirmationBoxComponent, {
        width: '250px',
        height: '200px',
        data: 'Are you sure you would like to edit your profile?'
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.editProfileService.submitEditedProfile(newInfo).subscribe(res => {
            // console.log(res);
            if (res.error) {
              this.openSnackBar('Please fill in all the fields correctly!', 'Dismiss');
              return null;
            } else {
              this.openSnackBar('Profile was updated successfully!', 'Ok');
              /**
               * if the profile was editted successfully
               * navigate the user to user profile page
               */
              return this.router.navigate(['/userprofile']);
            }

          });

        }

      });

    }

  }

}
