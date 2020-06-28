import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from "@angular/common";

import {BoxComponent} from "./UI/box/box.component"
const routes: Routes = [
  {path : '**' , component : BoxComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes) ,
    CommonModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
