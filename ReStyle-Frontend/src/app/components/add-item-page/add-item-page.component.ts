import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AddedItemInterface } from '../../models/AddedItemInterface';
import { AddItemService } from '../../services/add-item.service';

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
  cats: Category[] = [
    { value: 'Shirt', viewValue: 'Shirt' },
    { value: 'Pants', viewValue: 'Pants' }
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
    console.log('onSubmit ran');

    this.addItemService.submitNewItem(this.title, this.description, this.selectedFile);
  }

  ngOnInit() {
  }

  // Formats the values on the size slider (0 = XS, 1 = S, 2 = M, 3 = L, 4 = XL)
  formatLabel(value: number | null) {
    if (value === 0) {
      return 'XS';
    }
    if (value === 1) {
      return 'S';
    }
    if (value === 2) {
      return 'M';
    }
    if (value === 3) {
      return 'L';
    } else {
      return 'XL';
    }
  }
}
