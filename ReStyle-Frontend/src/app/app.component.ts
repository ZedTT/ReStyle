import { Component, ViewChild } from '@angular/core';

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
  }
}
