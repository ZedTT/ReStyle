import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TradeAcceptedComponent } from './trade-accepted.component';

describe('TradeAcceptedComponent', () => {
  let component: TradeAcceptedComponent;
  let fixture: ComponentFixture<TradeAcceptedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TradeAcceptedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TradeAcceptedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
