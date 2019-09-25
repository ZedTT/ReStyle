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
  numberOfIncomingTradeRequests: number; // TODO: consider rename? vs code f2
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

  // TODO: Check this again whenever we interact with a trade request
  checkForIncomingTradeRequests() {
    firebase.auth().onAuthStateChanged(user => {
      this.ngZone.run(() => { // make firebase run in ng zone
        this.tradeRequestService.getTradeRequestsByUser(user ? user.uid : null).subscribe(temp => {
          this.numberOfIncomingTradeRequests = (temp) ? (temp.length) : 0;
          // could probably just make the ng if more complicated in the html instead, 
          // but that sounds like work and we are in CST right now so this stays. 
          // Our tech debt must grow.
          this.incomingTradeRequestExists = (this.numberOfIncomingTradeRequests >= 1);
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
