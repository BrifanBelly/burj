import { Injectable, OnDestroy, EventEmitter } from '@angular/core';
import { DrinkRecipe, Ingredient } from '../core/models/visualisation';
import { Observable, bindCallback, of } from 'rxjs';
import { DrinksService } from '../core/services/drinks.service';
import { takeUntil, map, tap, switchMap, take } from 'rxjs/operators';
import { Paper, Element } from 'snapsvg';
// import * as Snap from 'snapsvg';

interface IngredientViewLayer {
  y: number;
  h: number;
  i: Ingredient;
}

export interface ViewData{
  mask: string;
  path: string;
  drinkLayers: IngredientViewLayer[];
}

const VIEWBOX_HEIGHT = 60;

declare var mina: any;  
 declare var Snap: any;  

@Injectable({
  providedIn: 'root'
})
export class RenderService implements OnDestroy {

  private snapSvg: Paper;
  private ngOnDestroy$: EventEmitter<boolean> = new EventEmitter();
  constructor(private drinkService: DrinksService) { }

  public getViewData(container: Paper): any | Observable<ViewData | undefined>{
    this.snapSvg = container;
    return this.drinkService.getCurrentDrink().pipe(
      takeUntil(this.ngOnDestroy$),
      map((drink: DrinkRecipe) => {
        if ( !(drink && drink.glass && drink.ingredients && drink.ingredients.length) ) {
          return undefined;
        }
        const drinkLayers = this.createDrinkLayers(drink);
          const mask = drink.glass.mask;
          const path = drink.glass.path;
          return { mask, path, drinkLayers }; 
      })
    )
  }

  renderDrink({mask, path, drinkLayers}: ViewData){
    return this.cleanUpCurrentRender()
    .pipe(
      tap(() => this.setClippingMask(mask)),
      switchMap(() => this.renderGlass(path)),
      switchMap(() => this.renderIngredients(drinkLayers)),
      take(1)
    );
  }

  /*
  * Function used to update view mask used to clip ingredients rectangle
  * so that only the part of view in the glass is visible
   */
  private setClippingMask( path: string ): void {
    this.snapSvg.select('#clipping-mask path').attr({ d: path });
  }

  /*
  * Function responsible for rendering/updating glass path with animation.
  * @returns observable which is triggered once animation has finished
   */
  private renderGlass( path: string = '' ): Observable<void> {
    return bindCallback(
      ( cb: () => void ) => { // callback function
        this.snapSvg.select('path').animate({ d: path }, 300, mina.easeinout, cb);
      }
    )();
  } 


   /*
  * Function responsible for rendering ingredients rectangles inside `.ingredients-layers` view element in the template.
  * Once rectangle for every ingredient is appended to the view animation is triggered
  * @returns observable which is triggered once animation has finished
   */
  private renderIngredients( layers: IngredientViewLayer[] ): Observable<void> {
    return bindCallback(
      ( cb: () => void ) => {
        const container: Paper = Snap(this.snapSvg.select('.g--ingredients'))
          .g() // adding additional grouping element which will be animated
          .attr({
            // set scale to 0 and move to the bottom of view so then we can scale it up and update position
            // to create illusion of filling the glass up from the bottom
            transform: `t 0 ${VIEWBOX_HEIGHT} s1 0`,
            opacity  : 0
          });
          layers.forEach(( layer: IngredientViewLayer ) => { // appending ingredients rectangles to the view
            container.rect(0, layer.y, 45, layer.h).attr({ 'fill': layer.i.colour });
          });
  
          container.animate({
            transform: 't 0 0 s1 1',
            opacity  : 1
          }, 600, mina.linear, cb);
        }
      )();
    }
  

//   renderDrink(container, drink: DrinkRecipe, drinkLayers: IngredientViewLayer[]): void {
//     container.select('.ingredients-layers').clear();

//     this.renderGlass(container, drink).subscribe(() => this.renderIngredients(container, drinkLayers))
//   }
//   private renderIngredients(c, layers: IngredientViewLayer[]): void {
//     const container = c.select('.ingredients-layers');

//     layers.forEach(( layer: IngredientViewLayer ) => {
//       const rect = container.rect(0, 0, 45, 0).attr('fill', layer.i.colour);
//       rect.animate({ height: layer.h, y: layer.y }, 1500);
//     });
//   }
//  private renderGlass(container, drink: DrinkRecipe): Observable<void> {
//     const render = ( cb: () => void ) => {
//       const path = container.select('path');
//       path.animate({ d: drink.glass.path }, 1500, mina.bounce, cb);
//     };
//     return bindCallback(render)();
//   }


    /*
  * Before creating new render we should clean up previous one.
  * In this case we are animating ingredients layers to create effect of emptying the glass
  * @returns observable which is triggered once animation has finished
   */
  private cleanUpCurrentRender(): Observable<void> {
    return bindCallback(
      ( cb: () => void ) => {
        const ingredientsView: Element = this.snapSvg.select('.g--ingredients g');
        if ( ingredientsView ) {
          ingredientsView.animate({
            // transitioning the view to the bottom and scaling in to 0
            // to create effect of emptying the glass
            transform: `t 0 ${VIEWBOX_HEIGHT} s1 0`,
            opacity  : 0
          }, 400, mina.linear, () => {
            // once animation is finished we can destroy view elements
            Snap(this.snapSvg.select('.g--ingredients')).clear();
            cb();
          });
        }
        else {
          cb();
        }
      }
    )();
  }


  createDrinkLayers(recipe: DrinkRecipe): IngredientViewLayer[] {
    const glass = recipe.glass;
    const { maskHeight, maskTopMargin } = glass;
    const ingredients = recipe.ingredients;
    const ingredientsTotal = ingredients.reduce(( acum: number, i: Ingredient ) => acum + i.amount, 0);
    const ingredientScale = maskHeight / ingredientsTotal;
    let topDist = maskTopMargin;
    return ingredients.map(( i: Ingredient ) => {
      const ingredientHeightScaled = i.amount * ingredientScale;
      const viewLayer: IngredientViewLayer = {
        y: topDist,
        h: ingredientHeightScaled,
        i: i
      };
      topDist += ingredientHeightScaled;
      return viewLayer;
    });
  }


   ngOnDestroy() {
    this.ngOnDestroy$.emit(true);
  }

}
