import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MessageBoxComponent} from "../../UI/message-box/message-box.component";
import {BoxComponent} from "../../UI/box/box.component";

import {MessageRoutingModule} from "./message.routing.module";
import {HeaderBoxComponent} from "../../UI/header-box/header-box.component";
import {listModule} from "../share/list.module";
import {ExtendBoxComponent} from "../../UI/extend-box/extend-box.component";

import { AvatarModule } from 'ngx-avatar';
import { InfiniteScrollModule } from 'ngx-infinite-scroll'
import {NgxSpinnerModule} from 'ngx-spinner';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { from } from 'rxjs';


@NgModule({
  declarations: [
   
    HeaderBoxComponent,
   ExtendBoxComponent,
    MessageBoxComponent,
    BoxComponent
   
 
  ],
  imports: [
    CommonModule,
    MessageRoutingModule,
    listModule,
    AvatarModule,
    InfiniteScrollModule,
    NgxSpinnerModule,
    FormsModule,
    ReactiveFormsModule
  
  ]
})
export class MessageModule { }
