import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListOrderRoutingModule } from './list-order-routing.module';
import { ListOrderComponent } from './list-order.component';
import { SharedModule } from '../shared/modules/shared/shared.module';
import {NgxMaskModule, IConfig} from 'ngx-mask'
export let options: Partial<IConfig> | (() => Partial<IConfig>);  

@NgModule({
  declarations: [ListOrderComponent],
  imports: [
    CommonModule,
    ListOrderRoutingModule,
    SharedModule,
    NgxMaskModule.forRoot(options)
  ]
})
export class ListOrderModule { }
