import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

 

import {SiginComponent} from './UI/sigin/sigin.component';
import {SignupComponent} from './UI/signup/signup.component';
import {AuthGuard} from "./helper/Auth-Guard";

const MessageModule = () => import('./module/message/message.module').then(x => x.MessageModule);
const routes: Routes = [
  // { path: '', redirectTo: 'signIn', pathMatch: "full" },
  { path: '', loadChildren: MessageModule, canActivate: [AuthGuard] },
  {path : 'signUp' , component : SignupComponent},
  {path : 'signIn' , component : SiginComponent},
  // {path: '', redirectTo: 'signIn', pathMatch: 'full'}
 
  
];

@NgModule({
  
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
