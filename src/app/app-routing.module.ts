import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from "@angular/common";

import { MessageBoxComponent} from '../app/UI/message-box/message-box.component';

import {BoxComponent} from './UI/box/box.component';
import { LeftBoxComponent } from './UI/left-box/left-box.component';
import { RightBoxComponent } from './UI/right-box/right-box.component';
import {SiginComponent} from './UI/sigin/sigin.component';


const routes: Routes = [
  // {path : '**' , component : BoxComponent},{}
  {path : 'signIn' , component : SiginComponent},
  
  // {path : 'home' , loadChildren: () => import ('./module/message/message.module').then(x => x.MessageModule)}
  // {path : '' , redirectTo : '/sigIn' , pathMatch : 'full'}

  // {path : 'signIn' , component : SiginComponent},
  // {path : 'message/:id' , component : MessageBoxComponent},
  // {path : '**' , component : BoxComponent}
];

@NgModule({
  
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
