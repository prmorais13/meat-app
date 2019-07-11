import { ErrorHandler, Injectable, NgZone } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { LoginService } from './security/login/login.service';
import { NotificationService } from './shared/messages/notification.service';

@Injectable()
export class ApplicationErrorHandle extends ErrorHandler {
  constructor(
    private loginService: LoginService,
    private notificationService: NotificationService,
    private zone: NgZone
  ) {
    super();
  }

  handleError(errorResponse: HttpErrorResponse | any) {
    if (errorResponse instanceof HttpErrorResponse) {
      const message = errorResponse.error.message;

      this.zone.run(() => {
        switch (errorResponse.status) {
          case 401:
            this.loginService.handleLogin();
            break;
          case 403:
            this.notificationService.notify(message || 'Não autorizado!');
            break;
          case 404:
            this.notificationService.notify(
              message ||
                'Recurso não encontrado. Verifique o console para mais detalhes!'
            );
            break;
        }
      });
    }
    super.handleError(errorResponse);
  }
}
