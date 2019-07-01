import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';

import { CustomizeRoutingModule } from './customize-routing.module';
import { CustomizeComponent } from './customize.component';
import { SharedModule } from '../shared/modules/shared/shared.module';

@NgModule({
  declarations: [CustomizeComponent],
  imports: [
    CommonModule,
    FormsModule,
    CustomizeRoutingModule,
    SharedModule
  ]
})
export class CustomizeModule { }
