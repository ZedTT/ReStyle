import { Component, OnInit, Input, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { TradeItem } from '../../models/TradeItem';

@Component({
  selector: 'app-trade-preview',
  templateUrl: './trade-preview.component.html',
  styleUrls: ['./trade-preview.component.sass']
})
export class TradePreviewComponent implements OnInit {
  @Input() thumbnails: TradeItem[] = []; // for getting the items
  @Input() userImage = 'defaultAvatar.png'; // for getting the user image

  constructor(private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit() {
  }

}
