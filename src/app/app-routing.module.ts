import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from "@angular/common";

 

import {SiginComponent} from './UI/sigin/sigin.component';
import {SignupComponent} from './UI/signup/signup.component';


const routes: Routes = [
  // { path: '', redirectTo: 'signIn', pathMatch: "full" },
  {path : 'signUp' , component : SignupComponent},
  {path : 'signIn' , component : SiginComponent}
 
  
];

@NgModule({
  
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
