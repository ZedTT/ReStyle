import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TradePreviewComponent } from './trade-preview.component';

describe('TradePreviewComponent', () => {
  let component: TradePreviewComponent;
  let fixture: ComponentFixture<TradePreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TradePreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TradePreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
