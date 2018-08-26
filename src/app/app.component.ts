import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './core/store/reducers';
import { Load } from './core/store/actions';
import { DrinksService } from './core/services/drinks.service';
import { DrinkRecipe } from './core/models/visualisation';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit{
  public currentDrink: DrinkRecipe;
  constructor( private storeService: DrinksService, private cdRef: ChangeDetectorRef, private router: Router ) {}

  public ngOnInit(): void {
    this.storeService.loadDrinks();
    this.storeService.getCurrentDrink().subscribe(( drink: DrinkRecipe | undefined ) => {
      this.currentDrink = drink;
      if(drink) {
        const navigationExtras: NavigationExtras = {
          queryParams: { 'drink': drink.name.toLowerCase()}
        };
        this.router.navigate(['/'], navigationExtras);
      }
    });
  }

  public loadNextDrink(): void {
    this.storeService.setNextDrink();
  }

  public loadPrevDrink(): void {
    this.storeService.setPreviousDrink();
  }
}
