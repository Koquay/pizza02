import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomizeComponent } from './customize.component';
import { CanDeactivateGuard } from '../shared/guards/can-deactivate.guard';

const routes: Routes = [
  {
    path: '',
    component: CustomizeComponent,
    canDeactivate: [CanDeactivateGuard],
    data: {breadcrumb: 'Customize'}
  },
  {
    path: ':id',
    component: CustomizeComponent,
    canDeactivate: [CanDeactivateGuard],
    data: {breadcrumb: 'Customize'}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomizeRoutingModule { }
