import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { LoginService } from './login.service';
import { NotificationService } from 'app/shared/messages/notification.service';

@Component({
  selector: 'mt-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  navigateTo: string;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private ns: NotificationService
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', [Validators.required])
    });

    this.navigateTo = this.activatedRoute.snapshot.params.to || btoa('/');
  }

  login() {
    // this.loginService
    //   .login(this.loginForm.value.email, this.loginForm.value.password)
    //   .subscribe(
    //     user => console.log(`Bem vindo(a) ${user.name}`),
    //     error => console.error(error.error.message),
    //     () => this.router.navigate([atob(this.navigateTo)])
    //   );
    this.loginService
      .login(this.loginForm.value.email, this.loginForm.value.password)
      .subscribe(
        user => {
          this.ns.notify(`Bem vindo(a) ${user.name}`);
          this.router.navigate([atob(this.navigateTo)]);
        } //,
        // error => this.ns.notify('Dados Inválidos!'),
        // () => this.router.navigate([atob(this.navigateTo)])
      );
  }
}
