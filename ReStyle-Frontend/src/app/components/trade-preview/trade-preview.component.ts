import { Component, OnInit, Input, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { TradeItem } from '../../models/TradeItem';

@Component({
  selector: 'app-trade-preview',
  templateUrl: './trade-preview.component.html',
  styleUrls: ['./trade-preview.component.sass']
})
export class TradePreviewComponent implements OnInit {
  @Input() thumbnails: TradeItem[] = []; // for getting the items
  testThumbnails: TradeItem[] = [];

  constructor(private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.log();
  }

  log() {
    console.log('test', this.thumbnails);
  }

  updateNgFor() {
    // this.changeDetectorRef.detectChanges();
  }

}
