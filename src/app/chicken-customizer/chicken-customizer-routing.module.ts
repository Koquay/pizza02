import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChickenCustomizerComponent } from './chicken-customizer.component';

const routes: Routes = [
  {
    path: '',
    component: ChickenCustomizerComponent
  },
  {
    path: ':id',
    component: ChickenCustomizerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChickenCustomizerRoutingModule { }
