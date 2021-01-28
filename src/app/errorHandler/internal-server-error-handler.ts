import {MessageService} from 'primeng/api';
import {HttpErrorResponse} from '@angular/common/http';
import {HttpResponseErrorHandler} from './http-response-error-handler';
import {Injectable} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {environment} from '../../environments/environment';

@Injectable()
export class InternalServerErrorHandler implements HttpResponseErrorHandler{

  constructor(private messageService: MessageService, private translateService: TranslateService) {
  }

  matches(error: HttpErrorResponse): boolean {
    return error.status === 500;
  }

  handle(error: HttpErrorResponse) {
    if(environment.generic_error_messages === true){
      this.handleGeneric()
    }else{
      this.handleNonGeneric(error);
    }
  }

  handleGeneric(){
    this.messageService.add({
      severity: 'error',
      summary: 'Error 500',
      detail: 'Internal Server Error',
      life: 5000
    })
  }

  handleNonGeneric(error: HttpErrorResponse){
    if(error.error){
      this.messageService.add({severity: 'error', summary: this.translateService.instant('toastMessages.error'), detail: error.error.message, life: 5000});
    }else{
      this.messageService.add({severity: 'error', summary: this.translateService.instant('toastMessages.error'), detail: error.message, life: 5000});
    }
  }
}
