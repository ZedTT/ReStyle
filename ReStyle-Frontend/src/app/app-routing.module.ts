import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { TradePageComponent } from './components/trade-page/trade-page.component';
import { AddItemPageComponent } from './components/add-item-page/add-item-page.component';
import { EditProfilePageComponent } from './components/edit-profile-page/edit-profile-page.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { TradeRequestsPageComponent } from './components/trade-requests-page/trade-requests-page.component';
import { AboutUsPageComponent } from './components/about-us-page/about-us-page.component';
import { NotFoundComponent } from './components/not-found/not-found.component';


const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'trade', component: TradePageComponent },
  { path: 'additem', component: AddItemPageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'editprofile', component: EditProfilePageComponent},
  { path: 'userprofile', component: UserProfileComponent },
  { path: 'traderequests', component: TradeRequestsPageComponent },
  { path: 'aboutus', component: AboutUsPageComponent},
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '/404', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
