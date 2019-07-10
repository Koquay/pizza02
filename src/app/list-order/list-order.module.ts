import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListOrderRoutingModule } from './list-order-routing.module';
import { ListOrderComponent } from './list-order.component';
import { SharedModule } from '../shared/modules/shared/shared.module';

@NgModule({
  declarations: [ListOrderComponent],
  imports: [
    CommonModule,
    ListOrderRoutingModule,
    SharedModule
  ]
})
export class ListOrderModule { }
