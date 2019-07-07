import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductCustomizerRoutingModule } from './product-customizer-routing.module';
import { ProductCustomizerComponent } from './product-customizer.component';
import { SharedModule } from '../shared/modules/shared/shared.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ProductCustomizerComponent],
  imports: [
    CommonModule,
    FormsModule,
    ProductCustomizerRoutingModule,
    SharedModule
  ]
})
export class ProductCustomizerModule { }
