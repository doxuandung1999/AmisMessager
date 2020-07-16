import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeftBoxComponent} from "../../UI/left-box/left-box.component";

import {FormsModule} from '@angular/forms';
import {FriendFilterPipe} from '../../pipe/friend-filter.pipe';
import { MessageRoutingModule } from '../message/message.routing.module';
import { AvatarModule } from 'ngx-avatar';

@NgModule({
  declarations: [
    LeftBoxComponent,
    FriendFilterPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    MessageRoutingModule,
    AvatarModule
  ],
  exports: [
    LeftBoxComponent
  ]
})
export class listModule { }
