import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderComponent } from './order.component';
import { ViewOrderGuard } from '../shared/guards/view-order.guard';

const routes: Routes = [
  {
    path: '',
    component: OrderComponent,
    canActivate: [ViewOrderGuard],
    data:{breadcrumb: 'Order'}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
