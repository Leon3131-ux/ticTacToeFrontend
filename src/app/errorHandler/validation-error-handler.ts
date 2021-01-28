import {MessageService} from 'primeng/api';
import {HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {HttpResponseErrorHandler} from './http-response-error-handler';
import {TranslateService} from '@ngx-translate/core';

@Injectable()
export class ValidationErrorHandler implements HttpResponseErrorHandler{

  constructor(private messageService: MessageService, private translateService: TranslateService) {}

  matches(error: HttpErrorResponse): boolean {
    return error.status === 400;
  }

  handle(error: HttpErrorResponse) {
    this.messageService.add({
      severity: 'error',
      summary: 'Error 400',
      detail: 'Invalid Data Received',
      life: 5000
    });
  }
}
