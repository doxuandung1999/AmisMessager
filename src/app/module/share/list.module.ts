import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeftBoxComponent} from "../../UI/left-box/left-box.component";
import { AppRoutingModule } from './../../app-routing.module';
import {FormsModule} from '@angular/forms';
import {FriendFilterPipe} from '../../pipe/friend-filter.pipe';
  import { from } from 'rxjs';

@NgModule({
  declarations: [
    LeftBoxComponent,
    FriendFilterPipe
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule
  ],
  exports: [
    LeftBoxComponent
  ]
})
export class listModule { }
