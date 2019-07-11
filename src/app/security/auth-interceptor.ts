import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { LoginService } from './login/login.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private loginService: LoginService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.loginService.isLoggedIn()) {
      const authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${this.loginService.userLogado.accessToken}`
        }
      });
      return next.handle(authReq);
    } else {
      return next.handle(req);
    }
  }
}
