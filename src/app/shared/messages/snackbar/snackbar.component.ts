import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/animations';

import { NotificationService } from '../notification.service';
import { timer } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';

@Component({
  selector: 'mt-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.css'],
  animations: [
    trigger('visibilidade-snack', [
      state('oculto', style({ opacity: 0, bottom: 0 })),
      state('visivel', style({ opacity: 1, bottom: 30 })),
      transition('oculto => visivel', animate('500ms 0s ease-in')),
      state('visivel', style({})),
      transition('visivel => oculto', animate('500ms 0s ease-out'))
    ])
  ]
})
export class SnackbarComponent implements OnInit {
  message: string = 'Seja bem vindo';
  visibilidadeSnack: string = 'oculto';

  constructor(private notificationService: NotificationService) {}

  ngOnInit() {
    this.notificationService.notifier
      .pipe(
        tap(message => {
          this.message = message;
          this.visibilidadeSnack = 'visivel';
        }),
        switchMap(message => timer(3000))
      )
      .subscribe(timer => (this.visibilidadeSnack = 'oculto'));
  }
}
