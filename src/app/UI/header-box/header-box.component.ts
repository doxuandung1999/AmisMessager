import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user/user';
import { Store } from '@ngrx/store';

import { Router } from '@angular/router';
import { UserState, getLogin } from 'src/app/reducer';

@Component({
  selector: 'app-header-box',
  templateUrl: './header-box.component.html',
  styleUrls: ['./header-box.component.scss']
})
export class HeaderBoxComponent implements OnInit {
  users : User[];
  constructor( private _store:Store<UserState>,private router:Router) {
    // lấy sự kiện get login và lấy user login
    this._store.select(getLogin).subscribe(item=>{
      this.users = item;
    });
   }

  ngOnInit(): void {
  }

}
