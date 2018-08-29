import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { DrinkRecipe } from '../core/models/visualisation';
import { Router, NavigationExtras } from '@angular/router';
import { DrinksService } from './services/drinks.service';

@Component({
  selector: 'app-main-app',
  templateUrl: './main-app.component.html',
  styleUrls: ['./main-app.component.scss']
})
export class MainAppComponent implements OnInit {
    public loading: boolean = true;
	constructor( private storeService: DrinksService, private cdRef: ChangeDetectorRef, private router: Router ) {

	}

	public ngOnInit(): void { 
		this.storeService.loadDrinks();
		this.storeService.getCurrentDrink().subscribe(( drink: DrinkRecipe | undefined ) => {
			if ( drink ) {
				this.loading = false;
				this.cdRef.detectChanges();
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
