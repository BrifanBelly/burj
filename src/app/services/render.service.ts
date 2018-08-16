import { Injectable } from '@angular/core';
import { DrinkRecipe, Ingredient } from '../core/models/visualisation';
import { Observable, bindCallback } from 'rxjs';

interface IngredientViewLayer {
  y: number;
  h: number;
  i: Ingredient;
}

declare var mina: any;  

@Injectable({
  providedIn: 'root'
})
export class RenderService {

  constructor() { }

  renderDrink(container, drink: DrinkRecipe, drinkLayers: IngredientViewLayer[]): void {
    container.select('.ingredients-layers').clear();

    this.renderGlass(container, drink).subscribe(() => this.renderIngredients(container, drinkLayers))
  }
  private renderIngredients(c, layers: IngredientViewLayer[]): void {
    const container = c.select('.ingredients-layers');

    layers.forEach(( layer: IngredientViewLayer ) => {
      const rect = container.rect(0, 0, 45, 0).attr('fill', layer.i.colour);
      rect.animate({ height: layer.h, y: layer.y }, 1500);
    });
  }
 private renderGlass(container, drink: DrinkRecipe): Observable<void> {
    const render = ( cb: () => void ) => {
      const path = container.select('path');
      path.animate({ d: drink.glass.path }, 1500, mina.bounce, cb);
    };
    return bindCallback(render)();
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

}
