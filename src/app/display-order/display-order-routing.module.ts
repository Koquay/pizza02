import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DisplayOrderComponent } from './display-order.component';

const routes: Routes = [
  {
    path: ':id',
    component: DisplayOrderComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DisplayOrderRoutingModule { }
