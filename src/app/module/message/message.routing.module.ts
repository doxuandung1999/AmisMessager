import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from "@angular/common";

import {MessageBoxComponent} from '../../UI/message-box/message-box.component';
import {BoxComponent} from '../../UI/box/box.component';

const routes: Routes = [

  
  {
    path : '' , 
    redirectTo: 'convasation/1',
    pathMatch: 'full'
  },
  {
    path : 'convasation/:id' , component : BoxComponent
  
  }

 
];

@NgModule({
  
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MessageRoutingModule { }
