import { Component, OnInit , Input } from '@angular/core';
import {Friend} from "../../model/friend/friend";
import {FriendService} from "../../service/friend.service";
import {ActivatedRoute} from "@angular/router";
import {Message} from "../../model/message/message";

@Component({
  selector: 'app-extend-box',
  templateUrl: './extend-box.component.html',
  styleUrls: ['./extend-box.component.scss']
})
export class ExtendBoxComponent implements OnInit {
  checkFile = false;
  checkImg = false;
  friends : Friend;
   @Input() message : Message[];
  arrFileShared = [
    {id:1 , pdf : 'Nội dung hội nghị.pdf'},
    {id:2 , pdf : 'Test 2.pdf'},
    {id:3 , pdf : 'Test 3.pdf'},
    {id:4 , pdf : 'test 4.pdf'}
  ]
  // arrImgShared = [
  //   {id:1 , img : '../../../assets/Avatar/2.jpg'},
  //   {id:2 , img : '../../../assets/Avatar/1.jpg'},
  //   {id:3 , img : '../../../assets/Avatar/3.jpg'},
  //   {id:4 , img : '../../../assets/Avatar/4.jpg'},
  //   {id:5 , img : '../../../assets/Avatar/5.jpg'},
  // ]
  constructor( private friendService : FriendService , 
    private route : ActivatedRoute) { 
      this.route.paramMap.subscribe(x => {
        this.getId();
      });
    }
  getId(){
    const id = +this.route.snapshot.paramMap.get('id');
    this.friends = this.friendService.getFriendId(id);
  }
  ngOndestroy(){
    this.getId();
  }
  ngOnInit(): void {
  }
  showFile(){
    this.checkFile = !this.checkFile;
  }
  showImg(){
    this.checkImg = !this.checkImg;
  }

}