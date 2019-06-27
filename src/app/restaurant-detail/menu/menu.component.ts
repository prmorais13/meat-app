import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { RestaurantsService } from 'app/restaurants/restaurants.service';
import { MenuItemModel } from '../menu-item/menu-item-model';

@Component({
  selector: 'mt-menu',
  templateUrl: './menu.component.html'
})
export class MenuComponent implements OnInit {
  menu: Observable<MenuItemModel[]>;

  constructor(
    private restaurantsService: RestaurantsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.menu = this.restaurantsService.menuOfRestaurant(
      this.route.parent.snapshot.params.id
    );
  }

  addMenuItem(item: MenuItemModel) {
    console.log('Itens: ', item);
  }
}
