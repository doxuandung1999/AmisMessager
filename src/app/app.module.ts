import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BoxComponent } from './UI/box/box.component';
import { HeaderBoxComponent } from './UI/header-box/header-box.component';
import { LeftBoxComponent } from './UI/left-box/left-box.component';
import { RightBoxComponent } from './UI/right-box/right-box.component';
import { ExtendBoxComponent } from './UI/extend-box/extend-box.component';


@NgModule({
  declarations: [
    AppComponent,
    BoxComponent,
    HeaderBoxComponent,
    LeftBoxComponent,
    RightBoxComponent,
    ExtendBoxComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
