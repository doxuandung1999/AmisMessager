import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderBoxComponent } from './UI/header-box/header-box.component';

import { MessageModule} from '../app/module/message/message.module';
import {listModule} from "./module/share/list.module";
import { from } from 'rxjs';
import {FriendService} from "../app/service/friend.service";
import { FriendFilterPipe } from './pipe/friend-filter.pipe';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {MessageService} from '../app/service/message.service';
import { SiginComponent } from './UI/sigin/sigin.component';
import { SignupComponent } from './UI/signup/signup.component';
import {StringeeService} from "./service/stringee.service";


import { UserService } from './service/user.service';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    AppComponent,
    SiginComponent,
    SignupComponent

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
  providers: [FriendService , MessageService , UserService,StringeeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
