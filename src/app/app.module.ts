import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BoxComponent } from './UI/box/box.component';
import { HeaderBoxComponent } from './UI/header-box/header-box.component';

import { MessageModule} from '../app/module/message/message.module';
import {listModule} from "./module/share/list.module";
import { from } from 'rxjs';

@NgModule({
  declarations: [
    AppComponent,
    BoxComponent,
    HeaderBoxComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    listModule,
    MessageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
