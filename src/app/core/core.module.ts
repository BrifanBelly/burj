import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { metaReducers, reducers } from './store/reducers';
import { DrinksEffects } from './store/effects';
import { FirebaseService } from './services/firebase.service';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../../environments/environment';
import { AngularFireDatabaseModule } from 'angularfire2/database';

const FirebaseModules = [
  AngularFireModule.initializeApp(environment.firebase),
  AngularFireDatabaseModule,
  AngularFireModule
]

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forRoot( reducers, { metaReducers }),
    EffectsModule.forRoot([DrinksEffects]),
    ...FirebaseModules,
    StoreDevtoolsModule.instrument({
      maxAge: 5
    })
  ],
  providers: [FirebaseService ],
  declarations: []
})
export class CoreModule { }
