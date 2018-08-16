import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DrinksService } from './core/services/drinks.service';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './core/core.module';
import { VisualizationComponent } from './visualization/visualization.component';

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
  providers: [DrinksService],
  bootstrap: [AppComponent]
})
export class AppModule { }
