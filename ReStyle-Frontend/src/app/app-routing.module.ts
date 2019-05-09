import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { TradePageComponent } from './components/trade-page/trade-page.component';
import { AddItemPageComponent } from './components/add-item-page/add-item-page.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  // { path: '**', redirectTo: '', pathMatch: 'full' },
  { path: 'trade', component: TradePageComponent },
  { path: 'additem', component: AddItemPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
