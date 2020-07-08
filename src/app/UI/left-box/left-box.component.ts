import { Component, OnInit } from '@angular/core';
import {FriendService} from '../../service/friend.service';
import {Friend} from '../../model/friend/friend';
import {MessageModule} from '../../module/message/message.module';
  import { from } from 'rxjs';
import {Router} from '@angular/router';
import {ActivatedRoute} from '@angular/router';
import {DataTransferService} from '../../service/dataTransferService';


@Component({
  selector: 'app-left-box',
  templateUrl: './left-box.component.html',
  styleUrls: ['./left-box.component.scss'],
  providers : [FriendService]
})
export class LeftBoxComponent implements OnInit {

  searchFriend : string;
  friend : Friend[];
  checkIt : boolean;
  focus : number;
  checkFocus : boolean;
  constructor( private friendService : FriendService , 
      private _router : Router , private _activeRoute : ActivatedRoute,
      private dataService : DataTransferService) { 
    // this.friend = friendService.getFriends();
    this._activeRoute.paramMap.subscribe(x => {
      // this.check();
    });
    
  }

  ngOnInit(): void {
    this.friend = this.friendService.getFriend();
    // this.getId();
    this.getFocus();
  }
  
  // thay đổi thành đã seen 
  clickRep(id : number){
    this.friend.forEach(f => {
      if (f.id === id) {
        f.noRep = 0;
        
      }
    });
  }
  
  // bắt sự kiện thay đổi id từ bên message để thực hiện focus vào cuộc trò chuyện
  getFocus(){
    this.dataService.userID.subscribe(data =>{
      this.focus = data;
    })
  }
  
}
