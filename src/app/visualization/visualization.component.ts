import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DrinksService } from '../core/services/drinks.service';
import { interval, Observable, bindCallback } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
import { RenderService } from '../services/render.service';
import { DrinkRecipe } from '../core/models/visualisation';


declare const Snap: any;

@Component({
  selector: 'app-visualization',
  templateUrl: './visualization.component.html',
  styleUrls: ['./visualization.component.scss']
})
export class VisualizationComponent implements OnInit {
  @ViewChild('svgContainer') public svgContainer: ElementRef
  snapSvg: any;
  clipingMask: string;
  stopCondition: boolean = false;

  constructor(private drinkService: DrinksService, private renderService: RenderService) { }

  ngOnInit() {
    this.snapSvg = Snap(this.svgContainer.nativeElement);
    this.drinkService.getCurrentDrink().subscribe((drink: DrinkRecipe | undefined) => {
      if(drink) {
        this.clipingMask = drink.glass.mask;
        this.snapSvg.select('.cp').attr({ d:  this.clipingMask })
        const drinkLayers = this.renderService.createDrinkLayers(drink);
        this.renderService.renderDrink(this.snapSvg, drink, drinkLayers);

        // change drink after 7 seconds
        // interval(7000).pipe(takeWhile(() => !this.stopCondition))
        // .subscribe(() => this.drinkService.setNextDrink());

        setTimeout(() => {
          this.drinkService.setNextDrink();
        }, 7000);
      }
    });
  }
  
}
