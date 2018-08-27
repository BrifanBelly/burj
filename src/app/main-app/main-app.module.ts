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

@NgModule({
  imports: [
    CommonModule,
		MainAppRoutingModule,
    ReactiveFormsModule,
    UtilsModule
  ],
  declarations: [
    VisualizationComponent,
    TitleComponent,
    DrinksListComponent,
    DescriptionComponent,
    MainAppComponent
  ],
  providers: [RenderService ]
})
export class MainAppModule { }
