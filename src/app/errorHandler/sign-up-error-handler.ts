import {HttpResponseErrorHandler} from './http-response-error-handler';
import {MessageService} from 'primeng/api';
import {HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable()
export class SignUpErrorHandler implements HttpResponseErrorHandler{
  constructor(
    private messageService: MessageService
  ) {}

  matches(error: HttpErrorResponse): boolean {
    if(error.status === 400){
      return true;
    }
  }

  handle(error: HttpErrorResponse) {
    this.messageService.add({severity: 'error', summary: 'Invalid credentials', life: 5000});
  }
}
