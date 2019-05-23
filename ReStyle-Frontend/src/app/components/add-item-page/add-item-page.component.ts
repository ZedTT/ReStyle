import { Component, OnInit } from '@angular/core';
import { AddedItemInterface } from '../../models/AddedItemInterface';
import { AddItemService } from '../../services/add-item.service';
// import { Options } from 'ng5-slider';
import { firebase } from 'firebaseui-angular';
import { Router } from '@angular/router';
import { MatSnackBar, MatDialog } from '@angular/material';
import { ConfirmationBoxComponent } from '../confirmation-box/confirmation-box.component';

export interface Category {
  value: string;
  viewValue: string;
}
export interface Sizes {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-add-item-page',
  templateUrl: './add-item-page.component.html',
  styleUrls: ['./add-item-page.component.sass']
})
export class AddItemPageComponent implements OnInit {
  selectedFile: File;
  title: string;
  description: string;
  sCat: string;
  sSize: number;
  gender: string;
  // ! This code is for the slider which is currently not implemented
  // value = 2;
  // options: Options = {
  //   showTicksValues: true,
  //   stepsArray: [
  //     {value: 0, legend: 'XS'},
  //     {value: 1, legend: 'S'},
  //     {value: 2, legend: 'M'},
  //     {value: 3, legend: 'L'},
  //     {value: 4, legend: 'XL'},
  //   ],
  //   showSelectionBar: true,
  //   getSelectionBarColor: (value: number): string => {
  //     if (value <= 1) {
  //         return 'red';
  //     }
  //     if (value <= 2) {
  //         return 'orange';
  //     }
  //     if (value <= 3) {
  //         return 'yellow';
  //     }
  //     return '#2AE02A';
  //   },
  //   getPointerColor: (value: number): string => {
  //     if (value <= 1) {
  //         return 'red';
  //     }
  //     if (value <= 2) {
  //         return 'orange';
  //     }
  //     if (value <= 3) {
  //         return 'yellow';
  //     }
  //     return '#2AE02A';
  // }
  // };
  cats: Category[] = [
    { value: 'Shirt', viewValue: '👕 Shirts' },
    { value: 'Pants', viewValue: '👖 Pants' },
    { value: 'Dresses', viewValue: '👗 Dress' },
    { value: 'Skirts', viewValue: '👗 Skirt' },
    { value: 'Outerwear', viewValue: '🧥 Outerwear' },
    { value: 'Accessories', viewValue: '👜 Accessories' },
    { value: 'Miscellaneous', viewValue: '➕ Miscellaneous' }
  ];
  sizes: Sizes[] = [
    { value: 0, viewValue: 'XS' },
    { value: 1, viewValue: 'S' },
    { value: 2, viewValue: 'M' },
    { value: 3, viewValue: 'L' },
    { value: 4, viewValue: 'XL' }
  ];
  fileName = 'No file selected';

  public imagePath;
  imgURL: any;
  public message: string;

  constructor(
    private addItemService: AddItemService,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
    ) { }

  ngOnInit() {
  }

  openSnackBar(message: string, actionMessage: string) {
    this.snackBar.open(message, actionMessage, {
      duration: 4000,
      verticalPosition: 'bottom'
    });
  }

  onFileSelected(fileEvent) {

    this.selectedFile = fileEvent.target.files[0] as File;
    this.fileName = this.selectedFile.name;

    // Displays a preview of the uploaded image
    const reader = new FileReader();
    reader.readAsDataURL(this.selectedFile);
    // tslint:disable-next-line: variable-name
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    };
  }

  onSubmit() {

    const uid = firebase.auth().currentUser.uid;

    if (!uid) { return null; }

    const validImage = !!this.selectedFile;
    const validTitle = !!this.title && this.title.match('[ -~]{8,40}');
    const validDescription = !!this.description && this.description.match('[ -~]{12,140}');
    const validCategory = !!this.sCat;
    const validGender = !!this.gender;
    const validSize = !!this.sSize;

    /**
     * To validate the correctness of all form fields that need to be filled including the uploaded image.
     */
    if (!(validImage && validTitle && validDescription && validCategory && validGender && validSize)) {
      // Open the snack bar to notify the user that they need to make all fields valid
      this.openSnackBar('Please fill in all the fields correctly and upload an image!', 'Dismiss');
      return null;
    } else {
      // open dialog box
      const dialogRef = this.dialog.open(ConfirmationBoxComponent, {
        width: '250px',
        height: '200px',
        data: 'Are you sure you would like to add this item?'
      });
      // when the dialog box is closed
      dialogRef.afterClosed().subscribe(result => {
        // if yes is clicked, will return true, handle this here
        // else do nothing if they clicked no
        if (result) {
          // Build the object that represents the new item.
          const newItem: AddedItemInterface = {
            ownerId: uid,
            title: this.title.trim(), // trim whitespace
            description: this.description.trim(), // trim whitespace
            gender: this.gender,
            size: this.sSize,
            category: this.sCat,
            photos: [this.selectedFile]
          };
          // Send the item to back end
          this.addItemService.submitNewItem(newItem).subscribe(res => {
            console.log(res);
            // handle errors
            if (res.error) {
              this.openSnackBar('Please fill in all fields and image correctly!', 'Dismiss');
              return null;
            } else {
              // * Happy path, notify the user that the item was successfully added
              this.openSnackBar('Item was added successfully!', 'Ok');
              /**
               * if the item was added successfully
               * navigate the user to user profile page
               */
              return this.router.navigate(['/userprofile']);
            }

          });

        }

      });

    }

  }

  // ! This code sits here until we re implement the slider
  // Formats the values on the size slider (0 = XS, 1 = S, 2 = M, 3 = L, 4 = XL)
  // formatLabel(value: number | null) { // TODO: use an array for this instead of if statements
  //   const sizeArray: string[] = ['XS', 'S', 'M', 'L', 'XL'];
  //   return sizeArray[value];
  // }

}
