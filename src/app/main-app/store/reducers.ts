import { Actions, ActionTypes } from "./actions";
import { storeFreeze } from 'ngrx-store-freeze';
import { ActionReducerMap, MetaReducer } from "@ngrx/store";
import { environment } from "../../../environments/environment.prod";
import { DrinkRecipe } from "../../core/models/visualisation";
import { getPrevInArray, getNextInArray } from "../../core/utils/utils";


export interface MainAppState {
    loaded: boolean;
    loading: boolean;
    drinks?: DrinkRecipe[];
    currentDrink?: DrinkRecipe;
}

export const mainAppInitialState: MainAppState = {
    loaded:  false,
    loading: false,
    drinks: []
};

export function mainAppReducer( state = mainAppInitialState, action: Actions): MainAppState {
    switch (action.type) {
        case ActionTypes.Load: {
            return {
                ...state,
                loading: true
            }
        }

        case ActionTypes.LoadComplete: {
            return {
                drinks: action.payload,
                loading: false,
                loaded: true
            }
        }


        case ActionTypes.SetCurrentDrink: {
            return {
                ...state,
                currentDrink: action.payload
            }
        }

        case ActionTypes.Load: {
            return {
                ...state,
                loading: true
            }
        }

        case ActionTypes.SetNextDrink: {
            const nextDrink = state.drinks && state.currentDrink && getNextInArray(state.drinks, state.currentDrink, 'name');
            if ( !nextDrink ) { return { ...state }; }
            return { ...state, currentDrink: nextDrink, };
          }
      
          case ActionTypes.SetPreviousDrink: {
            const prevDrink = state.drinks && state.currentDrink && getPrevInArray(state.drinks, state.currentDrink, 'name');
            if ( !prevDrink ) { return { ...state }; }
            return { ...state, currentDrink: prevDrink, };
          }

          case ActionTypes.SetDrinkById: {
			const drink = state.drinks.find(( d: DrinkRecipe ) => d.id === action.payload) || state.drinks[ 0 ];
			return { ...state, currentDrink: drink, };
		}

		case ActionTypes.SetDrinkByName: {
			const drink = state.drinks.find(( d: DrinkRecipe ) => d.name.toLowerCase() === action.payload.toLowerCase()) || state.drinks[ 0 ];

			return { ...state, currentDrink: drink, };
		}
      
          default:
            return state;
        
    }
}
