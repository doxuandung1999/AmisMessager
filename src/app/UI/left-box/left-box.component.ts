import { Component, OnInit } from '@angular/core';
import {FriendService} from '../../service/friend.service';
import {Friend} from '../../model/friend/friend';
import {MessageModule} from '../../module/message/message.module';
  import { from } from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-left-box',
  templateUrl: './left-box.component.html',
  styleUrls: ['./left-box.component.scss'],
  providers : [FriendService]
})
export class LeftBoxComponent implements OnInit {

 
  friend : Friend[];
  constructor( private friendService : FriendService , 
      private _router : Router) { 
    // this.friend = friendService.getFriends();
  }

  ngOnInit(): void {
    this.friend = this.friendService.getFriend();
  }
  onClick(id : number){
    this._router.navigate(['/message' , id])

  }
  
}
