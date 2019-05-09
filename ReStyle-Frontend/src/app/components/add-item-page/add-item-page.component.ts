import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
  selectedFile: File = null;
  title: string;
  description: string;
  sCat: string;
  cats: Category[] = [
    { value: 'Shirt', viewValue: 'Shirt' },
    { value: 'Pants', viewValue: 'Pants' }
  ];

  constructor(private http: HttpClient) {}

  onFileSelected(fileEvent) {
    console.log(fileEvent);
    this.selectedFile = fileEvent.target.files[0] as File;
    console.log(this.selectedFile);
  }

  onUpload() {
    const fd = new FormData();
    fd.append('image', this.selectedFile.name);
    this.http.post('', fd)
      .subscribe(res => {
        console.log(res);
      });
  }

  onSubmit() {
    console.log('test');
  }

  ngOnInit() {
  }

}
