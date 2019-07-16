import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductCustomizerComponent } from './product-customizer.component';
import { CanDeactivateGuard } from '../shared/guards/can-deactivate.guard';

const routes: Routes = [
  {
    path: ':productId/:productType',
    component: ProductCustomizerComponent,
    canDeactivate: [CanDeactivateGuard]
  },
  {
    path: '',
    component: ProductCustomizerComponent,
    canDeactivate: [CanDeactivateGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductCustomizerRoutingModule { }
