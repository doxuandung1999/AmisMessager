import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { UserState } from 'src/app/reducer';
import { Router } from '@angular/router';
import {UserService} from '../../service/user.service';
import { User } from 'src/app/model/user/user';
import * as userLogins from '../../action/userAction';


@Component({
  selector: 'app-sigin',
  templateUrl: './sigin.component.html',
  styleUrls: ['./sigin.component.scss']
})
export class SiginComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  checkLogin = false;
  users : User;


  constructor(private _store:Store<UserState>,private router:Router , private userService : UserService) { }
  onSubmit(){
    this.users = this.userService.getUser(this.loginForm.value['email'], this.loginForm.value['password']);
    if(this.users){
      this.checkLogin = true;
      this._store.dispatch(new userLogins.CheckLoginAction({
        id : this.users.id,
        email : this.users.email,
        password : this.users.password,
        userName : this.users.userName,
        avatar : this.users.avatar

      }) );
    }
    if(this.checkLogin){
      this.router.navigate(['/message/2']);
    }

  }

  ngOnInit(): void {
  }

}
