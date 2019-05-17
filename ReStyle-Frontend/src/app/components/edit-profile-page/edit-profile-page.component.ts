import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-edit-profile-page',
  templateUrl: './edit-profile-page.component.html',
  styleUrls: ['./edit-profile-page.component.sass']

})

export class EditProfilePageComponent implements OnInit {

  imgURL: any = 'https://i.imgur.com/H9hqFVV.jpg';
  selectedFile: File;
  fileName: string;

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

  constructor() { }

  ngOnInit() {
  }

}
