import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SaladCustomizerRoutingModule } from './salad-customizer-routing.module';
import { SaladCustomizerComponent } from './salad-customizer.component';
import { SharedModule } from '../shared/modules/shared/shared.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [SaladCustomizerComponent],
  imports: [
    CommonModule,
    FormsModule,
    SaladCustomizerRoutingModule,
    SharedModule
  ]
})
export class SaladCustomizerModule { }
