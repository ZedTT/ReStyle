import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TradePreviewThumbnailComponent } from './trade-preview-thumbnail.component';

describe('TradePreviewThumbnailComponent', () => {
  let component: TradePreviewThumbnailComponent;
  let fixture: ComponentFixture<TradePreviewThumbnailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TradePreviewThumbnailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TradePreviewThumbnailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
