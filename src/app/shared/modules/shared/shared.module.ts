import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { HeaderComponent } from '../../../header/header.component';
import { FooterComponent } from '../../../footer/footer.component';
import { ViewCartComponent } from '../../view-cart/view-cart.component';
import { MessageComponent } from '../../message/message/message.component';

@NgModule({
  declarations: [
    HeaderComponent, 
    FooterComponent,
    ViewCartComponent,
    MessageComponent
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    ViewCartComponent,
    MessageComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule
  ]
})
export class SharedModule { }
