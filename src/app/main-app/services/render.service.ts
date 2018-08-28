import { Injectable, OnDestroy, EventEmitter } from '@angular/core';
import { DrinkRecipe, Ingredient } from '../../core/models/visualisation';
import { Observable, bindCallback, of } from 'rxjs';
import { DrinksService } from '../../core/services/drinks.service';
import { takeUntil, map, tap, switchMap, take } from 'rxjs/operators';
import * as d3 from 'd3';

type D3Selection = d3.Selection<d3.BaseType, any, d3.BaseType, undefined>;

const ANIM_DURATION = 400;

interface IngredientViewLayer {
  y: number;
  h: number;
  i: Ingredient;
}

export interface ViewData{
  mask: string;
  path: string;
  drinkLayers: IngredientViewLayer[];
  recipe: DrinkRecipe;
}

const VIEWBOX_HEIGHT = 60;

@Injectable()
export class RenderService implements OnDestroy {
  svgD3Selection: D3Selection;
  private ngOnDestroy$: EventEmitter<boolean> = new EventEmitter();
  constructor(private drinkService: DrinksService) { }

  public getViewData(): any | Observable<ViewData | undefined>{
    return this.drinkService.getCurrentDrink().pipe(
      takeUntil(this.ngOnDestroy$),
      map((drink: DrinkRecipe) => {
        if ( !(drink && drink.glass && drink.ingredients && drink.ingredients.length) ) {
          return undefined;
        }

        const drinkLayers = this.createDrinkLayers(drink);
          const mask = drink.glass.mask;
          const path = drink.glass.path;
          return { mask, path, drinkLayers, recipe: drink }; 
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
    d3.select('#clipping-mask path').attr('d', path);
  }

  /*
  * Function responsible for rendering/updating glass path with animation.
  * @returns observable which is triggered once animation has finished
   */
  private renderGlass( path: string = '' ): Observable<void> {
    return bindCallback(
      ( cb: () => void ) => { // callback function
        const currentPath = d3.select('.path--glass-path');
				currentPath
				.transition()
				.duration(ANIM_DURATION)
				.attrTween('d', this.pathTween(currentPath!.node() as SVGPathElement, path, 1))
				.on('end', cb);
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
        const container: D3Selection = d3.select('.g--ingredients')
          .append('g') // adding additional grouping element which will be animated
          .attr(
            // set scale to 0 and move to the bottom of view so then we can scale it up and update position
            // to create illusion of filling the glass up from the bottom
            'transform',`translate(0 ${VIEWBOX_HEIGHT})`,
          );
          layers.forEach(( layer: IngredientViewLayer ) => { // appending ingredients rectangles to the view
            container.append('rect')
            .attr('x', 0)
            .attr('y', layer.y)
            .attr('width', 45)
            .attr('height', layer.h)
            .style('fill', layer.i.colour);
          });
  
          container.transition()
          .duration(ANIM_DURATION)
          .attr('transform', 'translate(0,0)')
          .on('end', cb)
        }
      )();
    }

    /*
  * Before creating new render we should clean up previous one.
  * In this case we are animating ingredients layers to create effect of emptying the glass
  * @returns observable which is triggered once animation has finished
   */
  private cleanUpCurrentRender(): Observable<void> {
    return bindCallback(
      ( cb: () => void ) => {
        const ingredientsView: D3Selection = d3.select('.g--ingredients g');
        if ( ingredientsView.node() ) {
          ingredientsView
          .transition()
          .duration(ANIM_DURATION)
          .attr('transform', `translate(0, ${VIEWBOX_HEIGHT})`)
          .on('end', cb)
          .remove();
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
    // const ingredientsTotal = ingredients.reduce(( acum: number, i: Ingredient ) => acum + i.amount, 0);
    const ingredientsTotal = Object.keys(recipe.ingredientsAmount).reduce(( acum: number, i: string ) => acum + recipe.ingredientsAmount[i].amount, 0);
    const ingredientScale = maskHeight / ingredientsTotal;
    let topDist = maskTopMargin;
    return  Object.keys(recipe.ingredientsAmount).map(( i: string, num ) => {
      const ingredientHeightScaled = recipe.ingredientsAmount[i].amount * ingredientScale;
      const viewLayer: IngredientViewLayer = {
        y: topDist || 1,
        h: ingredientHeightScaled || 1,
        i: recipe.ingredients[num]
      };
      topDist += ingredientHeightScaled;
      return viewLayer;
    });
  }

  private pathTween( currentPath: SVGPathElement, d1: string, precision: number ): any {
		return function (): any {
			const newPath: SVGPathElement = currentPath.cloneNode() as SVGPathElement;
			const n0 = currentPath.getTotalLength();
			const n1 = (newPath.setAttribute('d', d1), newPath).getTotalLength();
			// Uniform sampling of distance based on specified precision.
			const distances = [ 0 ];
			let i = 0;
			const dt = precision / Math.max(n0, n1);
			while ( (i += dt) < 1 ) {
				distances.push(i);
			}
			distances.push(1);

			// Compute point-interpolators at each distance.
			const points = distances.map(( t: number ) => {
				const p0 = currentPath.getPointAtLength(t * n0);
				const p1 = newPath.getPointAtLength(t * n1);
				return d3.interpolate([ p0.x, p0.y ], [ p1.x, p1.y ]);
			});

			return ( t: number ) => {
				return t < 1 ? 'M' + points.map(( p: any ) => p(t)).join('L') : d1;
			};
    };
  }


   ngOnDestroy() {
    this.ngOnDestroy$.emit(true);
  }

}
