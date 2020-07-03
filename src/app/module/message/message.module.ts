import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RightBoxComponent} from "../../UI/right-box/right-box.component";

import {MessageBoxComponent} from "../../UI/message-box/message-box.component";
import {BoxComponent} from "../../UI/box/box.component";

import {MessageRoutingModule} from "./message.routing.module";
import {HeaderBoxComponent} from "../../UI/header-box/header-box.component";
import {listModule} from "../share/list.module";
import {ExtendBoxComponent} from "../../UI/extend-box/extend-box.component";

import {FormsModule} from '@angular/forms';
import { from } from 'rxjs';

@NgModule({
  declarations: [
    RightBoxComponent,
    HeaderBoxComponent,
   ExtendBoxComponent,
    MessageBoxComponent,
    BoxComponent
 
  ],
  imports: [
    CommonModule,
    MessageRoutingModule,
    listModule

  ]
})
export class MessageModule { }
