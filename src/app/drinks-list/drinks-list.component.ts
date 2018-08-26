import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { DrinkRecipe, Ingredient } from '../core/models/visualisation';
import { FormControl } from '@angular/forms';
import { DrinksService } from '../core/services/drinks.service';
import { getAlcoholTypes, getFilteredDrinks } from './utils';

export interface Filters {
	query: string | undefined;
	types: { [key: string]: boolean };
}

@Component({
  selector: 'app-drinks-list',
  templateUrl: './drinks-list.component.html',
  styleUrls: ['./drinks-list.component.scss', './drinks-list-responsive.component.scss']
})
export class DrinksListComponent implements OnInit {

  searchControl: FormControl = new FormControl('');

	public mobileListVisible: boolean = false;
  drinks: DrinkRecipe[];
  visibleDrinks: DrinkRecipe[];
  currentDrink: DrinkRecipe | undefined;
  alcoholTypes: string[] = [];

  public filters: Filters = {
    query: undefined,
    types: {}
  }

  constructor(private storeService: DrinksService,private cdRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.storeService.getDrinks().subscribe((drinks: DrinkRecipe[] | undefined) => {
      this.drinks = drinks;
      this.visibleDrinks = drinks;
      this.alcoholTypes = getAlcoholTypes(drinks);
      this.setTypeFilters();
      this.cdRef.detectChanges();
    });
    this.storeService.getCurrentDrink().subscribe((drink: DrinkRecipe | undefined) => {
      this.currentDrink = drink;
      this.cdRef.detectChanges(); 
    })
    }

    public selectDrinkById(id: string): void {
      this.storeService.setCurrentDrinkById(id);
  }

  public toggleFilterType( type: string ): void {
    this.filters.types[ type ] = !this.filters.types[ type ];
    this.filterDrinks();
  }
  
  public resetTypeFilter(): void {
		Object.keys(this.filters.types).forEach(( type: string ) => {
			this.filters.types[ type ] = true;
		});
		this.filterDrinks();
		this.cdRef.detectChanges();
	}

	public resetSearchQuery(): void {
		this.searchControl.reset('');
		this.cdRef.detectChanges();
	}

	private setTypeFilters(): void {
		this.filters.types = this.alcoholTypes
		.reduce(( a: { [key: string]: boolean }, t: string ) => ({...a, [ t ]: true }), {});
	}

	private filterDrinks(): void {
    this.visibleDrinks = getFilteredDrinks(this.drinks, this.filters);
		this.cdRef.detectChanges();
	}



}
