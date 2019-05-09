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
  selectedFile: File;
  title: string;
  description: string;
  sCat: string;
  cats: Category[] = [
    { value: 'Shirt', viewValue: 'Shirt' },
    { value: 'Pants', viewValue: 'Pants' }
  ];
  fileName = 'No file selected';

  constructor(private http: HttpClient) {}

  onFileSelected(fileEvent) {
    this.selectedFile = fileEvent.target.files[0] as File;
    this.fileName = this.selectedFile.name;
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
    console.log('onSubmit ran');
    const fd = new FormData();
    fd.append('image', this.selectedFile);
    fd.append('title', this.title);
    fd.append('description', this.title);
    console.log(fd.getAll('image'));
    // this.http.post('/api/new-item', fd).subscribe(res => {
    //   console.log(res);
    // });
  }

  ngOnInit() {
  }

}
