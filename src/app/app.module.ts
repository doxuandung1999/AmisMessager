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
import {FormsModule} from '@angular/forms';
import {MessageService} from '../app/service/message.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderBoxComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    listModule,
    MessageModule
   
  ],
  providers: [FriendService , MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
