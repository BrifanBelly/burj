import { Action } from "@ngrx/store";
import { DrinkRecipe } from "../models/visualisation";

export enum ActionTypes {
    Load = '[drinks] Load',
    LoadComplete = '[drinks] Load Complete',
    LoadFail = '[drinks] Load Fail',
    SetCurrentDrink = '[drinks] Set Current',
    SetNextDrink = '[drinks] Set Next',
    SetPreviousDrink = '[drinks] Set Previous',
    SetDrinkById     = '[Drinks] Set drink by id',
	SetDrinkByName   = '[Drinks] Set drink by name',
}

export class Load implements Action {
   public readonly type: string = ActionTypes.Load;

   constructor( public payload: any = null ){}
}


export class LoadComplete implements Action {
    public readonly type: string = ActionTypes.LoadComplete;
 
    constructor( public payload: DrinkRecipe[] ){}
 }

 export class LoadFail implements Action {
    public readonly type: string = ActionTypes.LoadFail;
 
    constructor( public payload: any = null ){}
 }

 export class SetCurrentDrink implements Action {
    public readonly type: string = ActionTypes.SetCurrentDrink;
 
    constructor( public payload: DrinkRecipe ){}
 }

 export class SetNextDrink implements Action {
    public readonly type: string = ActionTypes.SetNextDrink;
 
    constructor( public payload: any = null ){}
 }

 export class SetPreviousDrink implements Action {
    public readonly type: string = ActionTypes.SetPreviousDrink;
 
    constructor( public payload: any = null ){}
 }

 export class SetDrinkById implements Action {
	public readonly type: ActionTypes.SetDrinkById = ActionTypes.SetDrinkById;

	constructor( public payload: string ) { }
}

export class SetDrinkByName implements Action {
	public readonly type: ActionTypes.SetDrinkByName = ActionTypes.SetDrinkByName;

    constructor( public payload: string ) { }
}


 export type Actions = 
 | Load
 | LoadComplete
 | LoadFail
 | SetCurrentDrink
 | SetNextDrink
 | SetPreviousDrink
 | SetDrinkById
 | SetDrinkByName;