import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgbdCarouselComponent } from './ngbd-carousel.component';

describe('NgbdCarouselComponent', () => {
  let component: NgbdCarouselComponent;
  let fixture: ComponentFixture<NgbdCarouselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgbdCarouselComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgbdCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
