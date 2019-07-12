import { Injectable } from '@angular/core';

import {Alert} from './alert/alert';
import {AlertType} from './alert/alert-type.enum';
import {AlertService} from './alert/alert.service';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(
    private alertService:AlertService
  ) { }

  public sendErrorMessage(error) {
    let message = error.error.message || error.message;
    let status = error.error.status || error.status;
    // let errorMessage = `Error: ${status} - ${message}`;
    let errorMessage = `${message}`;
    console.log('message', errorMessage);
    
    let alert = new Alert(errorMessage, AlertType.DANGER);
    this.alertService.sendAlert(alert);
    throwError(error);
    
  }
}
