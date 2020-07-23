import { Component, OnInit, Input } from '@angular/core';

import { Friend } from '../../model/friend/friend';
import { MessageModule } from '../../module/message/message.module';
import { from, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { DataTransferService } from '../../service/dataTransferService';
import { User2 } from '@app/model/user/user2';
import { AccountService } from "../../service/accountService";
import { first, map } from 'rxjs/operators';
import { TransferIdUserService } from "../../service/transferIdUser.service";
import { StringeeService } from "../../service/stringee.service";
import { filter } from 'rxjs/operators';
import { ConvidTransferService } from "../../service/convidTransfer.service";
import {UpdateListTransfer} from "../../service/updateListTransfer.service";
import {idConvTransferService} from "../../service/idConvTransfer.service";
import {UpdateAsReadTransfer} from "../../service/updateAsReadTransfer.service";
import {UserConvIdTranferService} from "../../service/userConvIdTranfer.service";
import {IdFocusTranferService} from "../../service/idFocusTransfer.service";

@Component({
  selector: 'app-left-box',
  templateUrl: './left-box.component.html',
  styleUrls: ['./left-box.component.scss'],
  providers: []
})
export class LeftBoxComponent implements OnInit {

  searchFriend: any;
  friend: Friend[];
  checkIt: boolean;
  focus: any // nhận id convs bên message để focus 
  checkFocus: boolean;
  users = null;
  checkChangeList = 1;
    
  userLogin: any;
  convId: string;
  conv: any;
  idUser: any;
  timer: any;
  updateCheck : number;// bắt sự kiện bên message để update list convs
  userNameLogin : any;
  idConvasation : any;
  test : any;

  @Input() convasation: any; // mảng chứa convs

  constructor(
    private _router: Router, private _activeRoute: ActivatedRoute,
    private dataService: DataTransferService,
    private accountService: AccountService,
    private transferIdUser: TransferIdUserService,
    private stringeeService: StringeeService,
    private convidTransferService: ConvidTransferService,
    private updateListTransfer : UpdateListTransfer,
    private idConvTransferService: idConvTransferService,
    private updateAsReadTransfer : UpdateAsReadTransfer,
    private userConvIdTranferService : UserConvIdTranferService,
    private idFocusTranferService : IdFocusTranferService) {
    // this.friend = friendService.getFriends();
    this._activeRoute.paramMap.subscribe(x => {
      // this.check();

    });

  }

  ngOnInit(): void {
    this._activeRoute.paramMap.subscribe(x => {
      this.getidUser();
      // this.getTest();
      this.getUpdate();
      this.getAsRead();
      this.userNameLogin = this.accountService.userValue.name;
     


    });
    

    // this.getId();
    this.getFocus();

    
    // lấy danh sách user
    this.getUser();

    this.getEmailLogin();

  }
  ngOndestroy() {
    
  }


  // lấy id user đăng nhập
  getidUser() {
    this.idUser = this.stringeeService.getCurrentUserIdFromAccessToken(this.accountService.userValue.token);
    // console.log(this.idUser);
  }


  //lấy danh sách user
  getUser() {
    this.accountService.getAll()
      .pipe(first())
      .subscribe(users => this.users = users);
  }


  // lấy email người đăng nhập
  getEmailLogin() {
    this.userLogin = this.accountService.userValue.email;
    // console.log(this.accountService.userValue.Id);
    console.log(this.userLogin);

  }

  // tạo cuộc trò chuyện khi click vào list user
  // chuyển id user sang bên message để bên message nhận dạng conv để thực hiện luôn convasation
  changeIdUser(user) {
    this.stringeeService.creatAConversation(user.userId , (status, code, message, conv) => {
      this._router.navigate(['/home/convasation/' + conv.id]);
    });

    this.checkChangeList = 1;
    for (let conv of this.convasation){
      for (let parti of conv.participants ){
        if(parti.userId == user.userId){
          this.idConvasation = conv.id;
          break;
        }
      }
    }
    
    this.transferIdUser.changeIdUser(user.userId);
    this.userConvIdTranferService.userTransferconvId(this.idConvasation);
  }
  // lấy danh sách conversation
  getConv() {
    this.stringeeService.getLastConversation((status, code, message, convs) => { 
      this.convasation = convs;

    });


  }
  


  // chuyền sự kiện thay đổi conv để lấy id conv và  id của người phía bên kia trong conv
  choseConvid(conv) {
    conv.unreadCount = 0;
    
    for (let user of conv.participants) {
      if (user.userId != this.idUser) {
        this.transferIdUser.changeIdUser(user.userId);
        break;
      }
    }
    this.idConvTransferService.changeConvid(conv.id);
    this.stringeeService.markConversationAsRead(conv.id);
  }

  // hàm tính thời gian chênh lệch để xác định hiển thị thời gian như thế nào
  calculateTime(time: any) {

    let changeTime = new Date(time);
    let date2 = new Date();
    this.timer = Math.floor((Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate()) - Date.UTC(changeTime.getFullYear(), changeTime.getMonth(), changeTime.getDate())) / (1000 * 60 * 60 * 24));
    if (this.timer <= 1) {
      return 1;
    } else if (this.timer > 1 && this.timer <= 7) {
      return 2;
    } else {
      return 3;
    }


  }


  // bắt sự kiện thay đổi id từ bên message để thực hiện focus vào cuộc trò chuyện
  getFocus() {
    this.convidTransferService.convid.subscribe(data => {
      this.focus = data;
    
    });
    
  }

 
  

  // bắt sự kiện update bên message
  getUpdate(){
    this.updateListTransfer.onupdate.subscribe(data => {
      this.getConv();
    });
    
  }

  // bắt sự kiên update là đã xem bên message
  getAsRead(){
    
    this.updateAsReadTransfer.asRead.subscribe(data =>{
      this.stringeeService.markConversationAsRead(this.focus);
      // this.choseConvid(this.focus);
    });
  }



  // thay đổi list conversation
  listConv() {
    this.checkChangeList = 1;
  }
  listFriend() {
    this.checkChangeList = 2;
  }

}
