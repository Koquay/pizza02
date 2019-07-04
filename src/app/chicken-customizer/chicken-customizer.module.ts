import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChickenCustomizerRoutingModule } from './chicken-customizer-routing.module';
import { ChickenCustomizerComponent } from './chicken-customizer.component';
import { SharedModule } from '../shared/modules/shared/shared.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ChickenCustomizerComponent],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    ChickenCustomizerRoutingModule
  ]
})
export class ChickenCustomizerModule { }
