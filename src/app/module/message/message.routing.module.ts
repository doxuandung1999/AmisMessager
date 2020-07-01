import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from "@angular/common";

import {MessageBoxComponent} from '../../UI/message-box/message-box.component';
import { Friend } from 'src/app/model/friend/friend';
import {BoxComponent} from '../../UI/box/box.component';


const routes: Routes = [
  { path: '', redirectTo: 'message/3', pathMatch: "full" },
  {path : '' , component : BoxComponent ,
    children : [
      {
        path : 'message/:id' , component : MessageBoxComponent
      }

    ]

  }
 
];

@NgModule({
  
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MessageRoutingModule { }
