import { Component, OnInit } from '@angular/core';
import { getLocaleTimeFormat } from '@angular/common';
import { MessageService } from './message.service';
import { AlertService } from './alert/alert.service';
import { Alert } from './alert/alert'

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {
  private alert:Alert = null;

  constructor(
    private alertService:AlertService
  ) { }

  ngOnInit() {
    this.getAlert();
  }

  private getAlert() {
    this.alertService.alertSubject.subscribe(alert => {
      this.alert = alert;
    })
  }

  private removeAlert() {
    this.alert = null;
  }

}
