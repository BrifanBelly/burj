import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { DrinkRecipe } from '../../core/models/visualisation';
import { DrinksService } from '../../core/services/drinks.service';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss']
})
export class DescriptionComponent implements OnInit {
  currentDrink: DrinkRecipe | undefined;

  constructor(private storeService: DrinksService, private cdRef: ChangeDetectorRef) { }

  ngOnInit() {
      this.storeService.getCurrentDrink().subscribe((drink: DrinkRecipe | undefined) => {
        this.currentDrink = drink;
        this.cdRef.detectChanges();
      })
  }

}
