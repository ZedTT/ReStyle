import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ItemCardStackComponent } from './components/item-card-stack/item-card-stack.component';

const routes: Routes = [
  { path: '', component: ItemCardStackComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
