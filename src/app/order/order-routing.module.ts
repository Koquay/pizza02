import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderComponent } from './order.component';
import { ViewOrderGuard } from '../shared/guards/view-order.guard';
import { CanDeactivateGuard } from '../shared/guards/can-deactivate.guard';

const routes: Routes = [
  {
    path: '',
    component: OrderComponent,
    canActivate: [ViewOrderGuard],
    // canDeactivate: [CanDeactivateGuard],
    data:{breadcrumb: 'Order'}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
