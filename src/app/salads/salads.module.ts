import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SaladsRoutingModule } from './salads-routing.module';
import { SaladsComponent } from './salads.component';
import { SharedModule } from '../shared/modules/shared/shared.module';

@NgModule({
  declarations: [SaladsComponent],
  imports: [
    CommonModule,
    SaladsRoutingModule,
    SharedModule
  ]
})
export class SaladsModule { }
