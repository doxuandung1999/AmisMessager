import { Component, OnInit } from '@angular/core';
import {FriendService} from "../../service/friend.service";
import {Friend} from "../../model/friend/friend";
import { RouterModule, Routes} from '@angular/router';
import {ActivatedRoute} from "@angular/router";
import {MessageService} from '../../service/message.service';
import {Message} from '../../model/message/message';


@Component({
  selector: 'app-message-box',
  templateUrl: './message-box.component.html',
  styleUrls: ['./message-box.component.scss']
})
export class MessageBoxComponent implements OnInit {

  friends : Friend;
  messages : Message[];
  idAmin = 1;
  friend_1;
  checkMessage = true;
  check = false;
  constructor(private friendService : FriendService 
    , private route: ActivatedRoute , private messageService : MessageService) {
      this.route.paramMap.subscribe(x => {
        this.getId();
        this.getMessage();
      });
    
   }
  
  ngOnInit(): void {

  
  }
  ngOndestroy(){
    this.getId();
    // this.getMessage();
  }
  getId(){

    const id = +this.route.snapshot.paramMap.get('id');
    this.friends = this.friendService.getFriendId(id);
  }

  getMessage(){
    const id = +this.route.snapshot.paramMap.get('id');
    this.messages= this.messageService.getMessageId(id , this.idAmin);
  }
  

  showInfor(){
    this.check = !this.check;
  }


}
