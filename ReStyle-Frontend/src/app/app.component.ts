import { Component, ViewChild, EventEmitter, OnInit, Output } from '@angular/core';
import ConfettiGenerator from 'confetti-js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  @ViewChild('footer') footer;
  title = 'ReStyle';

  easterEggOutput() {
    this.footer.toggleEasterEgg();
    const props: any = ['circle', 'square', 'triangle', 'line'];
    const svgs: string[] = [
      'Asset 9.svg',
      'Asset 9b.svg',
      'Asset 9p.svg',
      'Asset 9y.svg',
      'Asset 7p.svg',
      'Asset 7y.svg',
      'Asset 8b.svg',
      'Asset 8p.svg',
      'Asset 8y.svg',
      'Asset 7b.svg',
      'Asset 4p.svg',
      'Asset 4y.svg',
      'Asset 5b.svg',
      'Asset 5p.svg',
      'Asset 5y.svg',
      'Asset 6b.svg',
      'Asset 6p.svg',
      'Asset 6y.svg',
      'Asset 3p.svg',
      'Asset 3y.svg',
      'Asset 4b.svg',
      'Asset 2y.svg',
      'Asset 3b.svg',
      'Asset 2p.svg',
      'Asset 2b.svg',
      'Asset 1y.svg',
      'Asset 1p.svg',
      'Asset 1b.svg'
    ];
    for (const x of svgs) {
      props.push({
        type: 'svg', src: `../assets/Images/confetti/${x}`, size: 25, weight: 0.05
      });
    }
    const confettiSettings = {
      target: 'confetti', props, rotate: true
    };
    const confetti = new ConfettiGenerator(confettiSettings);
    confetti.render();
  }
}
