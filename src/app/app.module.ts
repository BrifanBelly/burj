import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DrinksService } from './core/services/drinks.service';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './core/core.module';
import { VisualizationComponent } from './visualization/visualization.component';
import { RenderService } from './services/render.service';

@NgModule({
  declarations: [
    AppComponent,
    VisualizationComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CoreModule
  ],
  providers: [DrinksService, RenderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
