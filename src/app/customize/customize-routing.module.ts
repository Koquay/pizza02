import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomizeComponent } from './customize.component';

const routes: Routes = [
  {
    path: ':id',
    component: CustomizeComponent,
    data: {breadcrumb: 'Customize'}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomizeRoutingModule { }
