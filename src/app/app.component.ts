import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './core/store/reducers';
import { Load } from './core/store/actions';
import { DrinksService } from './core/services/drinks.service';
import { DrinkRecipe } from './core/models/visualisation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit{
  constructor( private storeService: DrinksService ) {

  }

  public ngOnInit(): void {
    this.storeService.loadDrinks();
    this.storeService.getCurrentDrink().subscribe(( drink: DrinkRecipe | undefined ) => {
    });
  }

  public loadNextDrink(): void {
    this.storeService.setNextDrink();
  }

  public loadPrevDrink(): void {
    this.storeService.setPreviousDrink();
  }
}
