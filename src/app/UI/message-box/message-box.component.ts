import { Component, OnInit } from '@angular/core';
import {FriendService} from "../../service/friend.service";
import {Friend} from "../../model/friend/friend";
import { RouterModule, Routes} from '@angular/router';
import {ActivatedRoute} from "@angular/router";



@Component({
  selector: 'app-message-box',
  templateUrl: './message-box.component.html',
  styleUrls: ['./message-box.component.scss']
})
export class MessageBoxComponent implements OnInit {

  friends : Friend;
   
  constructor(private friendService : FriendService 
    , private route: ActivatedRoute) {
    
   }
  
    
  ngOnInit(): void {

    const id = +this.route.snapshot.paramMap.get('id');
    this.friends = this.friendService.getFriendId(id);
  }


}
