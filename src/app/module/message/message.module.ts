import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RightBoxComponent} from "../../UI/right-box/right-box.component";
import {ExtendBoxComponent} from "../../UI/extend-box/extend-box.component";
import {MessageBoxComponent} from "../../UI/message-box/message-box.component";
import { AppRoutingModule } from './../../app-routing.module';
import {FormsModule} from '@angular/forms';
import { from } from 'rxjs';

@NgModule({
  declarations: [
    RightBoxComponent,
    ExtendBoxComponent,
    MessageBoxComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule
    
  ],
  exports: [
    RightBoxComponent,
    ExtendBoxComponent,
    MessageBoxComponent
  ]
})
export class MessageModule { }
