import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductCustomizerComponent } from './product-customizer.component';

const routes: Routes = [
  {
    path: ':productId/:productType',
    component: ProductCustomizerComponent
  },
  {
    path: '',
    component: ProductCustomizerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductCustomizerRoutingModule { }
