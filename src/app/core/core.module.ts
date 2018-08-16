import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { metaReducers, reducers } from './store/reducers';
import { DrinksEffects } from './store/effects';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forRoot( reducers, { metaReducers }),
    EffectsModule.forRoot([DrinksEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 5
    })
  ],
  providers: [ ],
  declarations: []
})
export class CoreModule { }
