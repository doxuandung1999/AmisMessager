import { Component, OnInit } from '@angular/core';
import { FriendService } from '../../service/friend.service';
import { Friend } from '../../model/friend/friend';
import { MessageModule } from '../../module/message/message.module';
import { from, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { DataTransferService } from '../../service/dataTransferService';
import { User2 } from '@app/model/user/user2';
import { AccountService } from "../../service/accountService";
import { first, map } from 'rxjs/operators';
import {TransferIdUserService} from "../../service/transferIdUser.service";
import {StringeeService} from "../../service/stringee.service";
import { filter } from 'rxjs/operators';
import {ConvidTransferService} from "../../service/convidTransfer.service";


@Component({
  selector: 'app-left-box',
  templateUrl: './left-box.component.html',
  styleUrls: ['./left-box.component.scss'],
  providers: [FriendService]
})
export class LeftBoxComponent implements OnInit {

  searchFriend: string;
  friend: Friend[];
  checkIt: boolean;
  focus: number;
  checkFocus: boolean;
  users = null;
  checkChangeList = 1;
  convasation : any;
  userLogin : any;
  convId : string;
  

  constructor(private friendService: FriendService,
    private _router: Router, private _activeRoute: ActivatedRoute,
    private dataService: DataTransferService,
    private accountService: AccountService,
    private transferIdUser : TransferIdUserService,
    private stringeeService : StringeeService,
    private convidTransferService : ConvidTransferService ) {
    // this.friend = friendService.getFriends();
    this._activeRoute.paramMap.subscribe(x => {
      // this.check();
    });

  }

  ngOnInit(): void {
    this._activeRoute.paramMap.subscribe(x => {
      
      
    });

  
    // this.getId();
    this.getFocus();
    // lấy danh sách user
    this.getUser();
   
    this.getEmailLogin();

  }
  ngOndestroy() {
    // this.getId();
    // this.getMessage();
  }


  // getUser() {
  //   // Lấy danh sách user từ backend
  //   this.accountService.getAll()
  //     .pipe(
  //       map(data => data.filter(data => data.email != this.userLogin))
  //     ).subscribe( 
  //       data => { this.users = data }
  //     )
  // }

  //lấy danh sách user
  getUser(){
    this.accountService.getAll()
    .pipe(first())
    .subscribe(users => this.users = users);

  
  }


  // lấy email người đăng nhập
  getEmailLogin(){
    this.userLogin = this.accountService.userValue.email;
    // console.log(this.accountService.userValue.Id);
    console.log(this.userLogin);
    
  }

  // tạo cuộc trò chuyện khi click vào list user
  changeIdUser(user){
    console.log(user.userId);
    this.stringeeService.creatAConversation(user.userId);
  }
  // lấy danh sách conversation
  getConv() {
    this.stringeeService.getLastConversation( (status, code, message, convs) => {
      // self.convasation = convs;
      this.convasation = convs;
       console.log(convs);
    });
  }

  // chuyền sự kiện thay đổi conv id, id của người đăng nhập
  changeConvid(convid , userid){
    this.convidTransferService.changeConvid(convid);
    this.transferIdUser.changeIdUser(userid);
  }



  // thay đổi thành đã seen 
  clickRep(id: number) {
    this.friend.forEach(f => {
      if (f.id === id) {
        f.noRep = 0;

      }
    });
  }

  // bắt sự kiện thay đổi id từ bên message để thực hiện focus vào cuộc trò chuyện
  getFocus() {
    this.dataService.userID.subscribe(data => {
      this.focus = data;
    })
  }

  // thay đổi list conversation
  listConv (){
    this.checkChangeList = 1;
  }
  listFriend(){
    this.checkChangeList = 2;
  }

}
