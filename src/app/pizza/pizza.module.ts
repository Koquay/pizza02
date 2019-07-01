import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PizzaRoutingModule } from './pizza-routing.module';
import { PizzaComponent } from './pizza.component';
import { SharedModule } from '../shared/modules/shared/shared.module';

@NgModule({
  declarations: [PizzaComponent],
  imports: [
    CommonModule,
    SharedModule,
    PizzaRoutingModule
  ]
})
export class PizzaModule { }
