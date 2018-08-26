import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { SnapshotAction } from 'angularfire2/database/interfaces';
import { map } from "rxjs/operators";

import { DrinkRecipe, Glass, IngredientDef } from '../models/visualisation';

type FBGLass = Glass;
type FBIngredient = IngredientDef;

interface FBDrink {
	id?: string;
	active: boolean;
	name: string;
	glass: { [key: string]: Glass };
	ingredients: { [key: string]: FBIngredient };
}

@Injectable()
export class FirebaseService {
	private glassesRef: AngularFireList<FBGLass>;
	private ingredientsRef: AngularFireList<FBIngredient>;
	private drinksRef: AngularFireList<FBDrink>;
	private drinksIds: string[] = [];

	constructor( private db: AngularFireDatabase ) {
		this.glassesRef = db.list('glasses');
		this.ingredientsRef = db.list('ingredients');
		this.drinksRef = db.list('drinks');
	}

	// GLASSES
	public getGlasses(): Observable<Glass[]> {
        return this.glassesRef.snapshotChanges().pipe(map(( changes: SnapshotAction<any>[] ) =>
         changes.map(c => ({ ...c.payload.val(), id: c.payload.key }))
		));
	}

	// INGREDIENTS
	public getIngredients(): Observable<IngredientDef[]> {
		return this.ingredientsRef.snapshotChanges().pipe(map(( changes: SnapshotAction<any>[] ) =>
			 changes.map(c => ({ ...c.payload.val(), id: c.payload.key }))
		));
	}


	// DRINKS
	public getDrinks(): Observable<DrinkRecipe[]> {
		return this.drinksRef.snapshotChanges().pipe(map(( changes: SnapshotAction<any>[] ) => {
			this.drinksIds = [];
			return changes.map(c => {
				const ingredients = Object.values(c.payload.child('ingredients').val());
				const glass = Object.values(c.payload.child('glass').val())[ 0 ];
				const id = c.payload.key || '';
				this.drinksIds.push(id);
				return { ...c.payload.val(), id, ingredients, glass };
			});
		}));
	}

}
