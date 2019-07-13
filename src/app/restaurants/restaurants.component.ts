import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import {
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/animations';
import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
  catchError,
  tap
} from 'rxjs/operators';

import { RestaurantsService } from './restaurants.service';

import { RestaurantModel } from './restaurant/restaurant-model';
import { from } from 'rxjs';

@Component({
  selector: 'mt-restaurants',
  templateUrl: './restaurants.component.html',
  animations: [
    trigger('toggleSearch', [
      state('oculto', style({ opacity: 0, 'max-height': '0px' })),
      state(
        'visivel',
        style({ opacity: 1, 'max-height': '70px', 'margin-top': '20px' })
      ),
      transition('* => *', animate('250ms 0s ease-in-out'))
    ])
  ]
})
export class RestaurantsComponent implements OnInit {
  restaurants: RestaurantModel[];
  searchBarState = 'oculto';
  searchForm: FormGroup;
  searchControl: FormControl;

  constructor(
    private restaurantsService: RestaurantsService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.searchControl = new FormControl(null);
    this.searchForm = this.fb.group({
      searchControl: this.searchControl
    });

    this.searchControl.valueChanges
      .pipe(
        debounceTime(400),
        distinctUntilChanged(),
        switchMap(searchTerm =>
          this.restaurantsService
            .restaurants(searchTerm)
            .pipe(catchError(error => from([])))
        )
      )
      .subscribe(dados => (this.restaurants = dados));

    this.restaurantsService.restaurants().subscribe(dados => {
      this.restaurants = dados;
    });
  }

  toggleSearch() {
    this.searchBarState =
      this.searchBarState === 'oculto' ? 'visivel' : 'oculto';
  }
}
