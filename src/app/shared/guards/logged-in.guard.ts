import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { MessageService } from '../message/message/message.service';
import { UserService } from '../../user/user.service';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoggedInGuard implements CanActivate {
  constructor(
    private userService: UserService,
    private messageService:MessageService
  ) { }

  canActivate(): Observable<boolean> | boolean {
    if (this.userService.isLoggedIn) {
      return true;
    }

    const error = { error: 'You must be logged in to proceed.', status: 500 };
    this.messageService.sendErrorMessage(new HttpErrorResponse(error));
  }
}
