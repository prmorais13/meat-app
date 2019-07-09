import { UserModel } from './user-model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { MEAT_API } from 'app/app-api';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  userLogado: UserModel;

  constructor(private http: HttpClient) {}

  isLoggedIn(): boolean {
    return this.userLogado !== undefined;
  }

  login(email: string, password: string): Observable<UserModel> {
    return this.http
      .post<UserModel>(`${MEAT_API}/login`, { email, password })
      .pipe(
        tap(data => {
          this.userLogado = data;
          console.log(`Token: ${JSON.stringify(this.userLogado)}`);
        })
      );
  }
}
