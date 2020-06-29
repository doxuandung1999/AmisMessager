import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeftBoxComponent} from "../../UI/left-box/left-box.component";
import { AppRoutingModule } from './../../app-routing.module';

@NgModule({
  declarations: [
    LeftBoxComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule
  ],
  exports: [
    LeftBoxComponent
  ]
})
export class listModule { }
