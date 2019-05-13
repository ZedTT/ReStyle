import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TradeItemInterface } from 'src/app/models/TradeItemInterface';

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

  constructor(private http: HttpClient) {}

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

  onUpload() {
    const fd = new FormData();
    fd.append('image', this.selectedFile.name);
  }

  onSubmit() {
    console.log('onSubmit ran');
    const fd = new FormData();
    fd.append('image', this.selectedFile);
    fd.append('title', this.title);
    fd.append('description', this.description);
    console.log(fd);

    const anItem: TradeItemInterface = {
      ownerId : 'l15CGtMJ5bSnEkRPpYEgyvVWeLt2',
      description: this.description,
      gender : 'Female',
      size: 1,
      title : this.title,
      category : 'category',
      photos : ['www.image.com']
    };

    this.http.post('/api/items', anItem)
      .subscribe(res => {
      console.log(res);
    });
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
