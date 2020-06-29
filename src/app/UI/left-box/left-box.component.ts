import { Component, OnInit } from '@angular/core';
import {FriendService} from '../../service/friend.service';
import {Friend} from '../../model/friend/friend';
import {MessageModule} from '../../module/message/message.module';
  import { from } from 'rxjs';

@Component({
  selector: 'app-left-box',
  templateUrl: './left-box.component.html',
  styleUrls: ['./left-box.component.scss'],
  providers : [FriendService]
})
export class LeftBoxComponent implements OnInit {

 
  friend : Friend[];
  constructor( private friendService : FriendService) { 
    this.friend = friendService.getFriends();
  }

  ngOnInit(): void {
    
  }
  
}
