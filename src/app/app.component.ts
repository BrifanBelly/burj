import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
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
  title = 'drinks';

  public drinkName: string = "Gin";

  constructor( private storeService: DrinksService, private cdRef: ChangeDetectorRef, ) {

  }

  public ngOnInit(): void {
    this.storeService.loadDrinks();
    this.storeService.getCurrentDrink().subscribe(( drink: DrinkRecipe | undefined ) => {
      this.drinkName = drink && drink.name;
      // this.cdRef.detectChanges();
    });
  }

  public loadNextDrink(): void {
    this.storeService.setNextDrink();
  }

  public loadPrevDrink(): void {
    this.storeService.setPreviousDrink();
  }
}
