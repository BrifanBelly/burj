import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisualizationComponent } from './visualization/visualization.component';
import { TitleComponent } from './title/title.component';
import { DrinksListComponent } from './drinks-list/drinks-list.component';
import { DescriptionComponent } from './description/description.component';
import { MainAppComponent } from './main-app.component';
import { MainAppRoutingModule } from './main-app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RenderService } from './services/render.service';
import { UtilsModule } from '../utils/utils.module';
import { DrinksService } from './services/drinks.service';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { mainAppReducer, mainAppInitialState } from './store/reducers';
import { DrinksEffects } from './store/effects';

@NgModule({
  imports: [
    CommonModule,
		MainAppRoutingModule,
    ReactiveFormsModule,
    UtilsModule,
		StoreModule.forFeature('APP', mainAppReducer, { initialState: mainAppInitialState }),
		EffectsModule.forFeature([ DrinksEffects ]),
  ],
  declarations: [
    VisualizationComponent,
    TitleComponent,
    DrinksListComponent,
    DescriptionComponent,
    MainAppComponent
  ],
  providers: [RenderService, DrinksService ]
})
export class MainAppModule { }
