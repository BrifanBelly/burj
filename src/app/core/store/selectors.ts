import { AppState, DrinkState } from "./reducers";
import { createSelector } from "@ngrx/store";

export const getAppState = (state: AppState) => state.drink;

export const getDrinks = createSelector(getAppState, (state: DrinkState) => state && state.drinks || [])

export const getCurrentDrink = createSelector(getAppState, (state: DrinkState) => state && state.currentDrink)