import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-confirmation-box',
  templateUrl: './confirmation-box.component.html',
  styleUrls: ['./confirmation-box.component.sass']
})
export class ConfirmationBoxComponent {

  constructor(
    public dialogRef: MatDialogRef<ConfirmationBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public message: string
    ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
