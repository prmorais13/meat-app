import { UserModel } from './user-model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { MEAT_API } from 'app/app-api';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  userLoged: Observable<UserModel>;

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<UserModel> {
    return this.http
      .post<UserModel>(`${MEAT_API}/login`, { email, password })
      .pipe(user => (this.userLoged = user));
  }

  isLoggedIn(): boolean {
    return this.userLoged !== undefined;
  }
}
