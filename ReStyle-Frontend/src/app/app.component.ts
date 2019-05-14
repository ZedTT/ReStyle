import { Component, ViewChild } from '@angular/core';
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
    const confettiSettings = { target: 'confetti' };
    const confetti = new ConfettiGenerator(confettiSettings);
    confetti.render();
  }
}
