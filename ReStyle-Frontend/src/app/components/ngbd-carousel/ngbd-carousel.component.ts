import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ngbd-carousel',
  templateUrl: './ngbd-carousel.component.html',
  styleUrls: ['./ngbd-carousel.component.sass']
})
export class NgbdCarouselComponent {
  images = [1, 2, 3].map(() => `https://picsum.photos/900/500?random&t=${Math.random()}`);
}
