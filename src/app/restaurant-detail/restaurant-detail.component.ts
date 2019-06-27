import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { RestaurantsService } from 'app/restaurants/restaurants.service';
import { RestaurantModel } from 'app/restaurants/restaurant/restaurant-model';

@Component({
  selector: 'mt-restaurant-detail',
  templateUrl: './restaurant-detail.component.html'
})
export class RestaurantDetailComponent implements OnInit {
  restaurant: RestaurantModel;

  constructor(
    private restaurantsService: RestaurantsService,
    private router: ActivatedRoute
  ) {}

  ngOnInit() {
    this.restaurantsService
      .restaurantById(this.router.snapshot.params.id)
      .subscribe(
        dado => (this.restaurant = dado),
        error => console.error('Erro ao buscar restaurante por id.', error)
      );
  }
}
