import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ngbd-carousel',
  templateUrl: './ngbd-carousel.component.html',
  styleUrls: ['./ngbd-carousel.component.sass']
})
export class NgbdCarouselComponent {
  images = [
    'assets/pexels-photo-322207.jpeg',
    'assets/info-card-2.png',
    'https://dummyimage.com/200x300/576154/bcbdc4&text=More+Information'
  ];
}
