import { Injectable } from "@angular/core";
import { Effect, Actions } from "@ngrx/effects";
import { Observable, of } from "rxjs";
import { switchMap, map, catchError } from "rxjs/operators";
import * as drinkAction from "./actions";
import { DrinksService } from "../services/drinks.service";

@Injectable()
export class DrinksEffects {
    constructor(private actions$: Actions, private drinksService: DrinksService) {}

    @Effect()
    public loadDrinks$: Observable<drinkAction.LoadComplete | drinkAction.LoadFail > = this.actions$.ofType(drinkAction.ActionTypes.Load)
    .pipe(
        switchMap(() => {
            return this.drinksService.getDrinks().pipe(
                map((data) => new drinkAction.LoadComplete(data.DRINKS)),
                catchError((error: any) => of(new drinkAction.LoadFail(error)))
            )
            
        })
    );

    @Effect()
    public setCurrentDrink$: Observable<drinkAction.SetCurrentDrink> = this.actions$.ofType(drinkAction.ActionTypes.LoadComplete)
    .pipe(
        map((action: drinkAction.LoadComplete) => new drinkAction.SetCurrentDrink(action.payload[1]))
    )
}