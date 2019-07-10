import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DisplayOrderRoutingModule } from './display-order-routing.module';
import { DisplayOrderComponent } from './display-order.component';
import { SharedModule } from '../shared/modules/shared/shared.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [DisplayOrderComponent],
  imports: [
    CommonModule,
    FormsModule,
    DisplayOrderRoutingModule,
    SharedModule
  ]
})
export class DisplayOrderModule { }
