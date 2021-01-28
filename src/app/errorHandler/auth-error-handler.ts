import {HttpResponseErrorHandler} from './http-response-error-handler';
import {HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {environment} from '../../environments/environment';
import {MessageService} from 'primeng/api';

@Injectable()
export class AuthErrorHandler implements HttpResponseErrorHandler{

  constructor(private messageService: MessageService, private translateService: TranslateService) {}

  matches(error: HttpErrorResponse): boolean {
    return error.status === 403;
  }

  handle(error: HttpErrorResponse): void {
    if (environment.generic_error_messages === true){
      this.handleGeneric(error);
    }else{
      this.handleNonGeneric(error);
    }
  }

  handleGeneric(error: HttpErrorResponse){
    this.messageService.add({
      severity: 'error',
      summary: 'Error 403',
      detail: 'Forbidden Request',
      life: 5000
    });
  }

  handleNonGeneric(error: HttpErrorResponse){
    if (error.error){
      this.messageService.add({severity: 'error', summary: this.translateService.instant('toastMessages.error'), detail: error.error.message, life: 5000});
    }else{
      this.messageService.add({severity: 'error', summary: this.translateService.instant('toastMessages.error'), detail: error.message, life: 5000});
    }
  }
}
