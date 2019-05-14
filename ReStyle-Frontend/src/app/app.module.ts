import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

// Angular Firebase import section
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { FirebaseUIModule, firebase, firebaseui } from 'firebaseui-angular';


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
import { LoginComponent } from './components/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatFormFieldModule, MatRadioModule, MatSelectModule, MatSliderModule, MatInputModule, MatButtonToggleModule
} from '@angular/material'; // tsLint max line 140


const firebaseUiAuthConfig: firebaseui.auth.Config = {
  signInFlow: 'popup',
  // it has issue that when it comes back to the homepage after login, logout button work as intended.
  // need to be addressed later
  signInSuccessUrl: '/',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    {
      requireDisplayName: true,
      provider: firebase.auth.EmailAuthProvider.PROVIDER_ID
    }
    ],

  // Terms of service url.
  tosUrl: '/',
  // Privacy policy url.
  privacyPolicyUrl: '/',
  credentialHelper: firebaseui.auth.CredentialHelper.ACCOUNT_CHOOSER_COM
};

/**
 * Initialize firebase globally, early.
 * ? https://stackoverflow.com/a/54706749
 * ? https://www.freakyjolly.com/ionic-4-firebase-login-registration-by-email-and-password/
 */
firebase.initializeApp(environment.firebase);

@NgModule({
  declarations: [
    AppComponent,
    ItemCardComponent,
    ItemCardStackComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    TradePageComponent,
    HomePageComponent,
    LoginCardComponent,
    NgbdCarouselComponent,
    AddItemPageComponent
  ],
  imports: [
    BrowserModule,
    // import HttpClientModule after BrowserModule.
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    // Prateek, required for carousel
    NgbModule.forRoot(),
    // Firebase
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    FirebaseUIModule.forRoot(firebaseUiAuthConfig),
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    MatButtonToggleModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
