import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product.component';
import { SharedModule } from '../shared/modules/shared/shared.module';

import { MatCardModule } from '@angular/material';

@NgModule({
  declarations: [ProductComponent],
  imports: [
    CommonModule,
    ProductRoutingModule,
    SharedModule,
    MatCardModule
  ]
})
export class ProductModule { }
