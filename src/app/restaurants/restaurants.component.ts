import { Component, OnInit } from '@angular/core';

import { RestaurantsService } from './restaurants.service';

import { RestaurantModel } from './restaurant/restaurant-model';

@Component({
  selector: 'mt-restaurants',
  templateUrl: './restaurants.component.html'
})
export class RestaurantsComponent implements OnInit {
  restaurants: RestaurantModel[];

  constructor(private restaurantsService: RestaurantsService) {}

  ngOnInit() {
    this.restaurantsService.restaurants().subscribe(
      dados => {
        this.restaurants = dados;
      },
      error => console.error('Erro ao acessar restaurantes', error)
    );
  }
}
