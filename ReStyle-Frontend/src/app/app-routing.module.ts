import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ItemCardStackComponent } from './components/item-card-stack/item-card-stack.component';
import { TradePageComponent } from './components/trade-page/trade-page.component';

const routes: Routes = [
  { path: '', component: ItemCardStackComponent },
  // { path: '**', redirectTo: '', pathMatch: 'full' },
  { path: 'trade', component: TradePageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
