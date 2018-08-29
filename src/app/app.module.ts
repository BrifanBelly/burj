import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { DrinksService } from './main-app/services/drinks.service';
import {BrowserModule } from '@angular/platform-browser';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    CoreModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
