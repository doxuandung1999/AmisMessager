import { Component, OnInit } from '@angular/core';
import {FriendService} from "../../service/friend.service";
import {Friend} from "../../model/friend/friend";
import { from } from 'rxjs';

@Component({
  selector: 'app-message-box',
  templateUrl: './message-box.component.html',
  styleUrls: ['./message-box.component.scss']
})
export class MessageBoxComponent implements OnInit {

  friend : Friend[];
  constructor(private friendService : FriendService) {
    this.friend = friendService.getFriends();
   }

  ngOnInit(): void {

  }


}
