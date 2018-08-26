export interface Glass {
  id: number;
  name: string;
  path: string;
  mask: string;
  maskTopMargin: number;
  maskHeight: number;
}

export interface DrinkRecipe {
  id: number;
  name: string;
  glassId?: number;
  glass?: Glass;
  ingredientsIds?: number[];
  ingredients: any[];
  ingredientsAmount?: {amount: number, customAmount: string}
}

export interface IngredientDef {
  id: number;
  name: string;
  glass?: Glass;
  ingredients?: Ingredient[];
  colour: string;
  alcohol?: boolean;
}

export interface Ingredient {
	id: string;
	name: string;
	colour: string;
	alcohol: boolean;
	type: string; // eg gin, vodka, juice etc
}