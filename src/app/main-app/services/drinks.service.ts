import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { Store } from "@ngrx/store";
import * as actions from "../store/actions";
import { DrinkRecipe } from "../../core/models/visualisation";
import { getCurrentDrink } from "../store/selectors";
import { FirebaseService } from "../../core/services/firebase.service";
import { AppRootState } from "../../core/state";

@Injectable()
export class DrinksService {
    constructor(private store: Store<AppRootState>,private fbService: FirebaseService){}

    public getDrinks(): Observable<any> {
        return this.fbService.getDrinks()     
        .pipe(catchError((error: any) => Observable.throw(error.json())));
    }

    public loadDrinks(): void {
        this.store.dispatch(new actions.Load());
      }
    
      public setNextDrink(): void {
        this.store.dispatch(new actions.SetNextDrink());
      }
    
      public setPreviousDrink(): void {
        this.store.dispatch(new actions.SetPreviousDrink());
      }
    
      public getCurrentDrink(): Observable<DrinkRecipe | undefined> {
        return this.store.select(getCurrentDrink);
      }

      public setCurrentDrinkById( id: string ): void {
        this.store.dispatch(new actions.SetDrinkById(id));
      }
    
      public setCurrentDrinkByName( name: string ): void {
        this.store.dispatch(new actions.SetDrinkByName(name));
      }
}