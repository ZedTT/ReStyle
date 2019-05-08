import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ngbd-carousel',
  templateUrl: './ngbd-carousel.component.html',
  styleUrls: ['./ngbd-carousel.component.sass']
})
export class NgbdCarouselComponent {
  images = [
    'https://dummyimage.com/200x300/000/fff&text=Welcome+to+Restyle',
    'https://dummyimage.com/200x300/615461/bcbdc4&text=Information',
    'https://dummyimage.com/200x300/576154/bcbdc4&text=More+Information'
  ];
}
