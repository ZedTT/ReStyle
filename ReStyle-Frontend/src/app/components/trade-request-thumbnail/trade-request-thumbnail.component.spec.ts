import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TradeRequestThumbnailComponent } from './trade-request-thumbnail.component';

describe('TradeRequestThumbnailComponent', () => {
  let component: TradeRequestThumbnailComponent;
  let fixture: ComponentFixture<TradeRequestThumbnailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TradeRequestThumbnailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TradeRequestThumbnailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
