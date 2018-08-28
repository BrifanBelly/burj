import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { FirebaseService } from './services/firebase.service';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../../environments/environment';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { appRootReducers, metaReducers, appRootInitialState } from './state';

const FirebaseModules = [
  AngularFireModule.initializeApp(environment.firebase),
  AngularFireDatabaseModule,
  AngularFireModule
]

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forRoot( appRootReducers, { initialState: appRootInitialState, metaReducers }),
    EffectsModule.forRoot([]),
    ...FirebaseModules,
    StoreDevtoolsModule.instrument({
      maxAge: 5
    })
  ],
  providers: [FirebaseService ],
  declarations: []
})
export class CoreModule { }
