import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChickenRoutingModule } from './chicken-routing.module';
import { ChickenComponent } from './chicken.component';
import { SharedModule } from '../shared/modules/shared/shared.module';


@NgModule({
  declarations: [ChickenComponent],
  imports: [
    CommonModule,
    SharedModule,
    ChickenRoutingModule
  ]
})
export class ChickenModule { }
