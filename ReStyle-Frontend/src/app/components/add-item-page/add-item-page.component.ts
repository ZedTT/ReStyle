import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-item-page',
  templateUrl: './add-item-page.component.html',
  styleUrls: ['./add-item-page.component.sass']
})
export class AddItemPageComponent implements OnInit {
  selectedFile: File = null;

  constructor(private http: HttpClient) {}

  onFileSelected($event) {
// tslint:disable-next-line: deprecation
    console.log(event);
    this.selectedFile = event.target.files[0] as File;
  }

  onUpload() {
    const fd = new FormData();
    fd.append('image', this.selectedFile.name);
    this.http.post('', fd)
      .subscribe(res => {
        console.log(res);
      });
  }

  ngOnInit() {
  }

}
