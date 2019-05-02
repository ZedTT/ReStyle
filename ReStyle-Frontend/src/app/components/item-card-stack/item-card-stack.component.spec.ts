import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemCardStackComponent } from './item-card-stack.component';

describe('ItemCardStackComponent', () => {
  let component: ItemCardStackComponent;
  let fixture: ComponentFixture<ItemCardStackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemCardStackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemCardStackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
