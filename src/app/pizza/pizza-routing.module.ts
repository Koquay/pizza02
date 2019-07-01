import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PizzaComponent } from './pizza.component';

const routes: Routes = [
  {
    path: '',
    component:PizzaComponent,
    data: {breadcrumb: 'pizza'}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PizzaRoutingModule { }
