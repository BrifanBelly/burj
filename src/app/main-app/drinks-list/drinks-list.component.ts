import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { DrinkRecipe, Ingredient } from '../../core/models/visualisation';
import { FormControl } from '@angular/forms';
import { DrinksService } from '../services/drinks.service';
import { getAlcoholTypes, getFilteredDrinks } from './utils';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

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
  public loading: boolean = true;
  drinks: DrinkRecipe[];
  visibleDrinks: DrinkRecipe[];
  currentDrink: DrinkRecipe | undefined;
  alcoholTypes: string[] = [];
  private filterFirstTimeClicked: boolean = false;


  public filters: Filters = {
    query: undefined,
    types: {}
  }

  constructor(private storeService: DrinksService,private cdRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.storeService.getDrinks().subscribe((drinks: DrinkRecipe[] | undefined) => {
      this.loading = !drinks.length;
      this.drinks = drinks;
      this.visibleDrinks = drinks;
      this.alcoholTypes = getAlcoholTypes(drinks);
      this.setTypeFilters();
      this.cdRef.detectChanges();
    });
    this.storeService.getCurrentDrink().subscribe((drink: DrinkRecipe | undefined) => {
      this.currentDrink = drink;
      this.cdRef.detectChanges(); 
    });

    
		this.searchControl.valueChanges
		.pipe(debounceTime(200), distinctUntilChanged())
		.subscribe(( query: any ) => {
			this.filters.query = query;
			this.filterDrinks();
			this.cdRef.detectChanges();
		});
    }
    

    public selectDrinkById(id: string): void {
      this.storeService.setCurrentDrinkById(id);
  }

  public toggleFilterType( type: string ): void {
    if ( !this.filterFirstTimeClicked ) {
			this.resetTypeFilter(false);
		}
    this.filters.types[ type ] = !this.filters.types[ type ];
    this.filterDrinks();
    this.filterFirstTimeClicked = true;
  }
  
  public resetTypeFilter(resetTo: boolean = true): void {
		this.filterFirstTimeClicked = false;
		Object.keys(this.filters.types).forEach(( type: string ) => {
			this.filters.types[ type ] = resetTo;
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
