import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { DrinkRecipe } from '../core/models/visualisation';
import { Router, NavigationExtras } from '@angular/router';
import { DrinksService } from '../core/services/drinks.service';

@Component({
  selector: 'app-main-app',
  templateUrl: './main-app.component.html',
  styleUrls: ['./main-app.component.scss']
})
export class MainAppComponent implements OnInit {
	public currentDrink: DrinkRecipe | undefined;

	constructor( private storeService: DrinksService, private cdRef: ChangeDetectorRef, private router: Router ) {

	}

	public ngOnInit(): void {
		console.log('ngOnInit');
		this.storeService.loadDrinks();
		this.storeService.getCurrentDrink().subscribe(( drink: DrinkRecipe | undefined ) => {
			this.currentDrink = drink;
			if ( drink ) {
				const navigationExtras: NavigationExtras = {
					queryParams: { 'drink': drink.name.toLowerCase() },
				};
				this.router.navigate([ '/' ], navigationExtras);
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
