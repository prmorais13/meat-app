import { Injectable } from '@angular/core';
import {
  CanLoad,
  Route,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './login/login.service';

@Injectable({
  providedIn: 'root'
})
export class LoggedinGuard implements CanLoad, CanActivate {
  constructor(private loginService: LoginService) {}

  checkAuthentication(path: string): boolean {
    const loggedIn = this.loginService.isLoggedIn();

    if (!loggedIn) {
      this.loginService.handleLogin(`/${path}`);
    }
    return loggedIn;
  }

  canLoad(route: Route): boolean {
    // console.log('CanLoad');
    return this.checkAuthentication(route.path);
  }

  canActivate(
    activatedRoute: ActivatedRouteSnapshot,
    routerState: RouterStateSnapshot
  ): boolean {
    // console.log('CanActivated');
    return this.checkAuthentication(activatedRoute.routeConfig.path);
  }
}
