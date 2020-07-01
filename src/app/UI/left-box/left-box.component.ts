import { Component, OnInit } from '@angular/core';
import {FriendService} from '../../service/friend.service';
import {Friend} from '../../model/friend/friend';
import {MessageModule} from '../../module/message/message.module';
  import { from } from 'rxjs';
import {Router} from '@angular/router';
import {ActivatedRoute} from '@angular/router';


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
  constructor( private friendService : FriendService , 
      private _router : Router , private _activeRoute : ActivatedRoute) { 
    // this.friend = friendService.getFriends();
    this._activeRoute.paramMap.subscribe(x => {
      // this.check();
    });
    
  }

  ngOnInit(): void {
    this.friend = this.friendService.getFriend();
  }
  onClick(id : number){
    this._router.navigate(['/message' , id])

  }
  // check(){
  //   const id = +this._activeRoute.snapshot.paramMap.get('id');
  //   this.checkIt = this.friendService.checkRep(id,);
  // }
}
