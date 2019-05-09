import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ItemCardComponent } from './components/item-card/item-card.component';
import { ItemCardStackComponent } from './components/item-card-stack/item-card-stack.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { TradePageComponent } from './components/trade-page/trade-page.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { LoginCardComponent } from './components/login-card/login-card.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbdCarouselComponent } from './components/ngbd-carousel/ngbd-carousel.component';
import { AddItemPageComponent } from './components/add-item-page/add-item-page.component';

@NgModule({
  declarations: [
    AppComponent,
    ItemCardComponent,
    ItemCardStackComponent,
    HeaderComponent,
    FooterComponent,
    TradePageComponent,
    HomePageComponent,
    LoginCardComponent,
    NgbdCarouselComponent,
    AddItemPageComponent
  ],
  imports: [
    BrowserModule,
    // import HttpClientModule after BrowserModule.
    HttpClientModule,
    AppRoutingModule,
    NgbModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
