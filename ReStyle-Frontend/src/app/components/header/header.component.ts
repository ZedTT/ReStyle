import { Component, OnInit, Output, EventEmitter, NgZone } from '@angular/core';
import * as firebase from 'firebase';
import { TradeRequestService } from 'src/app/services/trade-request.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {
  @Output() easterEggOutput: EventEmitter<boolean> = new EventEmitter();
  easterEggEnabled: boolean;
  easterEggClickCount = 0;
  incomingTradeRequestExists: boolean;

  constructor(private tradeRequestService: TradeRequestService, private ngZone: NgZone) {
    this.easterEggEnabled = false;
   }

  ngOnInit() {
    this.setClasses();
    this.checkForIncomingTradeRequests();
  }

  setClasses() {
    const classes = {
      header: true,
      navbar: true,
      'navbar-dark': true,
      'fixed-top': true,
      'easter-egg': this.easterEggEnabled
    };
    return classes;
  }

  checkForIncomingTradeRequests() {
    firebase.auth().onAuthStateChanged(user => {
      this.ngZone.run(() => { // make firebase run in ng zone
        this.tradeRequestService.getTradeRequestsByUser(user ? user.uid : null).subscribe(temp => {
          this.incomingTradeRequestExists = (temp) ? (temp.length >= 1) : false;
        });
      });
    });
  }

  toggleEasterEgg() {
    this.easterEggClickCount++;
    if (this.easterEggClickCount > 4) {
      this.easterEggClickCount = 0;
      this.easterEggEnabled = !this.easterEggEnabled;
      this.easterEggOutput.emit(this.easterEggEnabled);
    }
  }

}
