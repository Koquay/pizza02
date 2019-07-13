import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { HeaderComponent } from '../../../header/header.component';
import { FooterComponent } from '../../../footer/footer.component';
import { ViewCartComponent } from '../../view-cart/view-cart.component';
import { MessageComponent } from '../../message/message/message.component';
import { ConfirmationDialogComponent } from '../../dialog/confirmation-dialog/confirmation-dialog.component';
import { MatButtonModule, MatDialogModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    HeaderComponent, 
    FooterComponent,
    ViewCartComponent,
    MessageComponent,
    ConfirmationDialogComponent
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    ViewCartComponent,
    MessageComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    // BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule
  ],
  entryComponents: [
    ConfirmationDialogComponent
  ]
})
export class SharedModule { }
