import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from '@angular/common/http';
import { catchError } from "rxjs/operators";
import { Store } from "@ngrx/store";
import { AppState } from "../store/reducers";
import * as actions from "../store/actions";
import { DrinkRecipe } from "../models/visualisation";
import { getCurrentDrink } from "../store/selectors";
import { FirebaseService } from "./firebase.service";

@Injectable()
export class DrinksService {
    constructor(private http: HttpClient, private store: Store<AppState>,private fbService: FirebaseService){}

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