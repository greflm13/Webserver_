import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HereComponent } from './here.component';
import { HomeComponent } from './home.component';
import { WhoComponent } from './who.component';
import { WhooComponent } from './whoo.component';


@NgModule({
  declarations: [
    AppComponent, HomeComponent, HereComponent, WhoComponent, WhooComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
