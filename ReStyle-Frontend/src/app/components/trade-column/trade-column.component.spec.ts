import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TradeColumnComponent } from './trade-column.component';

describe('TradeColumnComponent', () => {
  let component: TradeColumnComponent;
  let fixture: ComponentFixture<TradeColumnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TradeColumnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TradeColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
