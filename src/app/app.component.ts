import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './core/store/reducers';
import { Load } from './core/store/actions';
import { DrinksService } from './core/services/drinks.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'drinks';

  constructor(private drinkService: DrinksService) {}

  ngOnInit(): void {
    this.drinkService.loadDrinks();
  }
}
