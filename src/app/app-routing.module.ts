import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from "@angular/common";

import { MessageBoxComponent} from '../app/UI/message-box/message-box.component';

import {BoxComponent} from './UI/box/box.component';
import { LeftBoxComponent } from './UI/left-box/left-box.component';
import { RightBoxComponent } from './UI/right-box/right-box.component';
import {SiginComponent} from './UI/sigin/sigin.component';


const routes: Routes = [
  
  {path : 'signin' , component : SiginComponent}
  
];

@NgModule({
  
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
