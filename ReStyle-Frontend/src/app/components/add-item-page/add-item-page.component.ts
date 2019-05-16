import { Component, OnInit } from '@angular/core';
import { AddedItemInterface } from '../../models/AddedItemInterface';
import { AddItemService } from '../../services/add-item.service';
import { Options } from 'ng5-slider';

export interface Category {
  value: string;
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
  size: number;
  gender: string;
  value = 2;
  options: Options = {
    showTicksValues: true,
    stepsArray: [
      {value: 0, legend: 'XS'},
      {value: 1, legend: 'S'},
      {value: 2, legend: 'M'},
      {value: 3, legend: 'L'},
      {value: 4, legend: 'XL'},
    ],
    showSelectionBar: true,
    getSelectionBarColor: (value: number): string => {
      if (value <= 1) {
          return 'red';
      }
      if (value <= 2) {
          return 'orange';
      }
      if (value <= 3) {
          return 'yellow';
      }
      return '#2AE02A';
    },
    getPointerColor: (value: number): string => {
      if (value <= 1) {
          return 'red';
      }
      if (value <= 2) {
          return 'orange';
      }
      if (value <= 3) {
          return 'yellow';
      }
      return '#2AE02A';
  }
  };
  cats: Category[] = [
    // { value: '0', viewValue: '-😃--------------'},
    { value: 'Shirt', viewValue: '👕 Shirts' },
    { value: 'Pants', viewValue: '👖 Pants' },
    { value: 'Outerwear', viewValue: '🧥 Outerwear' },
    { value: 'Accessories', viewValue: '👜 Accessories' },
    { value: 'Miscellaneous', viewValue: '➕ Miscellaneous' }
  ];
  fileName = 'No file selected';

  public imagePath;
  imgURL: any;
  public message: string;

  constructor(private addItemService: AddItemService) {}

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

    const newItem: AddedItemInterface = {
      ownerId : 'l15CGtMJ5bSnEkRPpYEgyvVWeLt2', // TODO: Make sure none of these are hard coded.
      title: this.title,
      description: this.description,
      gender : this.gender,
      size: this.size,
      category : this.sCat,
      photos : [this.selectedFile]
    };

    this.addItemService.submitNewItem(newItem);
  }

  ngOnInit() {
  }

  // Formats the values on the size slider (0 = XS, 1 = S, 2 = M, 3 = L, 4 = XL)
  // formatLabel(value: number | null) { // TODO: use an array for this instead of if statements
  //   const sizeArray: string[] = ['XS', 'S', 'M', 'L', 'XL'];
  //   return sizeArray[value];
  // }
}
