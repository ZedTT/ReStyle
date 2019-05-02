import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ItemCardComponent } from './components/item-card/item-card.component';
import { ItemCardStackComponent } from './components/item-card-stack/item-card-stack.component';

@NgModule({
  declarations: [
    AppComponent,
    ItemCardComponent,
    ItemCardStackComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
