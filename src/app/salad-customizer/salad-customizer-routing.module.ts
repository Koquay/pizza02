import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SaladCustomizerComponent } from './salad-customizer.component';

const routes: Routes = [
  {
    path: ':id',
    component: SaladCustomizerComponent
  },
  {
    path: '',
    component: SaladCustomizerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SaladCustomizerRoutingModule { }
