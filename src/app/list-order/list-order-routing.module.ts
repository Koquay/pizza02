import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListOrderComponent } from './list-order.component';
import { LoggedInGuard } from '../shared/guards/logged-in.guard';

const routes: Routes = [
  {
    path: '',
    component: ListOrderComponent,
    canActivate: [LoggedInGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListOrderRoutingModule { }
