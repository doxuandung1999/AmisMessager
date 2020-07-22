import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderBoxComponent } from './UI/header-box/header-box.component';

import { MessageModule} from '../app/module/message/message.module';
import {listModule} from "./module/share/list.module";
import { from } from 'rxjs';

import { FriendFilterPipe } from './pipe/friend-filter.pipe';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';

import { SiginComponent } from './UI/sigin/sigin.component';
import { SignupComponent } from './UI/signup/signup.component';
import {StringeeService} from "./service/stringee.service";



import { HttpClientModule } from '@angular/common/http';
import { ConvsFilterPipe } from './pipe/convs-filter.pipe';



@NgModule({
  declarations: [
    AppComponent,
    SiginComponent,
    SignupComponent,
    ConvsFilterPipe

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    listModule,
    MessageModule,
    // StoreModule.forRoot(reducers),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
   
  ],
  providers: [StringeeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
