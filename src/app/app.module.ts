import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DrinksService } from './core/services/drinks.service';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './core/core.module';
import { VisualizationComponent } from './visualization/visualization.component';
import { RenderService } from './services/render.service';
import { TitleComponent } from './title/title.component';
import { UtilsModule } from './utils/utils.module';
import { DrinksListComponent } from './drinks-list/drinks-list.component';
import { DescriptionComponent } from './description/description.component';
import { Routes, RouterModule } from '@angular/router';

const appRoutes: Routes = [
	// { path: '', component: AppComponent },
	{ path: '**', component: AppComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    VisualizationComponent,
    TitleComponent,
    DrinksListComponent,
    DescriptionComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CoreModule,
    UtilsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [DrinksService, RenderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
