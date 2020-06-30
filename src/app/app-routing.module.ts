import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from "@angular/common";
import {MessageModule} from "./module/message/message.module";
import { MessageBoxComponent} from '../app/UI/message-box/message-box.component';
import {BoxComponent} from "./UI/box/box.component"
import { LeftBoxComponent } from './UI/left-box/left-box.component';
import { RightBoxComponent } from './UI/right-box/right-box.component';
const routes: Routes = [
  // {path : '**' , component : BoxComponent},
  {path : 'message/:id' , component : MessageBoxComponent}
];

@NgModule({
  
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
