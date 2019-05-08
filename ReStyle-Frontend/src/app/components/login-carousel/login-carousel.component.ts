import { Component, Input, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { Observable, interval } from 'rxjs';
import { startWith, take, map } from 'rxjs/operators';
import { NguCarouselConfig } from '@ngu/carousel';

@Component({
  selector: 'app-login-carousel',
  templateUrl: 'login-carousel.component.html',
  styleUrls: ['login-carousel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginCarouselComponent implements OnInit {
  @Input() name: string;
  imgags = [
    'https://dummyimage.com/200x300/000/fff&text=Welcome+to+Restyle',
    'https://dummyimage.com/200x300/615461/bcbdc4&text=Information',
    'https://dummyimage.com/200x300/576154/bcbdc4&text=More+Information'
  ];
  public carouselTileItems$: Observable<number[]>;
  public carouselTileConfig: NguCarouselConfig = {
    grid: { xs: 1, sm: 1, md: 1, lg: 5, all: 0 },
    speed: 250,
    point: {
      visible: true
    },
    touch: true,
    loop: true,
    interval: { timing: 5000 },
    animation: 'lazy'
  };
  tempData: any[];

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.tempData = [];
    this.carouselTileItems$ = interval(5000).pipe(
      startWith(-1),
      take(3),
      map(val => {
        const data = (this.tempData = [
          ...this.tempData,
          this.imgags[Math.floor(Math.random() * this.imgags.length)]
        ]);
        return data;
      })
    );
  }
}
