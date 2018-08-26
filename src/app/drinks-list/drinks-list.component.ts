import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { DrinkRecipe } from '../core/models/visualisation';
import { DrinksService } from '../core/services/drinks.service';

@Component({
  selector: 'app-drinks-list',
  templateUrl: './drinks-list.component.html',
  styleUrls: ['./drinks-list.component.scss']
})
export class DrinksListComponent implements OnInit {

  drinks: DrinkRecipe[];
  currentDrink: DrinkRecipe | undefined;

  constructor(private storeService: DrinksService,private cdRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.storeService.getDrinks().subscribe((drinks: DrinkRecipe[] | undefined) => {
      this.drinks = drinks;
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

}
