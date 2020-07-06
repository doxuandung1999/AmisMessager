import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from "@angular/common";

 

import {SiginComponent} from './UI/sigin/sigin.component';
import {SignupComponent} from './UI/signup/signup.component';


const routes: Routes = [
  
  {path : 'signup' , component : SignupComponent},
  {path : 'signin' , component : SiginComponent},

  { path: '', redirectTo: 'signin', pathMatch: "full" },
 
  
];

@NgModule({
  
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
