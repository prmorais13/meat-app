import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, NavigationEnd } from '@angular/router';

import { Observable } from 'rxjs';
import { tap, filter } from 'rxjs/operators';

import { UserModel } from './user-model';
import { MEAT_API } from 'app/app-api';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  userLogado: UserModel;
  lastUrl: string;

  constructor(private http: HttpClient, private router: Router) {
    router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe((e: NavigationEnd) => (this.lastUrl = e.url));
  }

  isLoggedIn(): boolean {
    return this.userLogado !== undefined;
  }

  logout() {
    this.userLogado = undefined;
  }

  handleLogin(path: string = this.lastUrl) {
    this.router.navigate(['/login', btoa(path)]);
  }

  login(email: string, password: string): Observable<UserModel> {
    return this.http
      .post<UserModel>(`${MEAT_API}/login`, { email, password })
      .pipe(
        tap(data => {
          this.userLogado = data;
        })
      );
  }
}
