import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanDeactivate
} from '@angular/router';

// import { Observable } from 'rxjs';

import { OrderComponent } from './order.component';

@Injectable({
  providedIn: 'root'
})
export class LeaveOrderGuard implements CanDeactivate<OrderComponent> {
  canDeactivate(
    orderComponent: OrderComponent,
    activatedRoute: ActivatedRouteSnapshot,
    RouterState: RouterStateSnapshot
  ): boolean {
    if (!orderComponent.isOrderCompleted()) {
      return window.confirm('Deseja desistir da compra?');
    } else {
      return true;
    }
  }
}
