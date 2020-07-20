import { Component, OnInit, ViewChild, ElementRef, HostListener, ViewChildren, QueryList } from '@angular/core';
import { FriendService } from "../../service/friend.service";
import { Friend } from "../../model/friend/friend";
import { RouterModule, Routes, Router } from '@angular/router';
import { ActivatedRoute } from "@angular/router";
import { MessageService } from '../../service/message.service';
import { Message } from '../../model/message/message';
import { User2 } from 'src/app/model/user/user2';
// import { Store } from '@ngrx/store';
// import { UserState, getLogin } from 'src/app/reducer';
import { DataTransferService } from '../../service/dataTransferService';
import { AccountService } from "../../service/accountService";
import { StringeeService } from "../../service/stringee.service";
import { TransferIdUserService } from "../../service/transferIdUser.service";

import {ConvidTransferService} from "../../service/convidTransfer.service";
import { StringeeClient, StringeeChat } from "stringee-chat-js-sdk";




// class ImageSnippet{
//   constructor(public src: string , public file: File){}
// }
class fileSnippet {
  constructor(public src: string, public file: File) { }
}
declare var require: any
const FileSaver = require('file-saver');
@Component({
  selector: 'app-message-box',
  templateUrl: './message-box.component.html',
  styleUrls: ['./message-box.component.scss']
})


export class MessageBoxComponent implements OnInit {

  friends: Friend;
 
  messageAdd: Message;
  idAmin = 1;
  friend_1;
  checkMessage = true;
  check = false;
  imgsrc: string;
  checkZoom = false;
  users: User2[];
  userId: number;
  Access_Token: string;
  user: User2;
  idUser: any // lấy id user người đang đăng nhập
  // idtest : any; // id conv
  messages : any // mảng chứa tin nhắn trong 1 conversation
  userName : any; // tên người đăng nhập
  userInfor = null;
  idUserInfor : any;
  idUrl : any;

  constructor(private friendService: FriendService
    , private route: ActivatedRoute, private messageService: MessageService,
    private router: Router,
    private dataService: DataTransferService,
    private accountService: AccountService,
    private stringeeService: StringeeService,
    private convidTransferService : ConvidTransferService,
    private transferIdUserService : TransferIdUserService
  ) {

    
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(x => {
      // this.getIdConv();
      this.getLastMessage();
      this.getidUser();
      this.getNameUser();
      this.getidUserInfor();
      this.getUserInfor();
      this.postIdConvs();
      this.stringeeService.stringeeChat.on('onObjectChange', (info) => {
        this.getLastMessage();
      });


    });
   


    console.log(this.accountService.userValue.name);
    // this.stringeeClient.connect();

    this.stringeeService.test();


  }
  ngOndestroy() {
    // this.getId();
  }

  // lấy id user đang nhập
  getidUser(){
    this.idUser  = this.stringeeService.getCurrentUserIdFromAccessToken(this.accountService.userValue.token);
    // console.log(this.idUser);
  }
  // lấy user name user đăng nhập
  getNameUser(){
    this.userName = this.accountService.userValue.name;
  }

  // lấy id user phía bên kia bắn sang
  getidUserInfor(){
    this.transferIdUserService.userID.subscribe(data => {this.idUserInfor = data});
  }


  // lấy thông tin user phía bên kia đang nhắn tin
  getUserInfor(){
    this.accountService.getById(this.idUserInfor)
    .subscribe(users => this.userInfor = users);
  }

  // truyền id convs sang bên list để thực hiện focus
  postIdConvs(){
    const idUrl = this.route.snapshot.paramMap.get('id');
    this.convidTransferService.changeConvid(idUrl);
  }

  // thay đổi biến check để ẩn hiện phần extend component
  showInfor() {
    this.check = !this.check;
  }

  // gửi tin nhắn dạng text vào mảng message
  sendMessage(event) {
    // lấy id covs trên url
    const idUrl = this.route.snapshot.paramMap.get('id');
    var message = event.target.value;
    // this.stringeeService.sendTextMessage(this.idtest,message);
    this.stringeeService.sendTextMessage(idUrl,message);
    event.target.value = null;
    this.getLastMessage();

  }

  // lấy các message cuối cùng
  getLastMessage(){
    const idUrl = this.route.snapshot.paramMap.get('id');
    this.stringeeService.getLastMessage(idUrl,(status, code, message, msgs) => {
      this.messages = msgs;
      console.log(msgs);
    });

  }

  // up file
  selectedFile: fileSnippet;
  processImg(fileInput: any) {
    const file: File = fileInput.files[0];
    // console.log(file.name);
    // console.log(file.type);
    const render = new FileReader();

    render.addEventListener('load', (event: any) => {
      this.selectedFile = new fileSnippet(event.target.result, file);
      const id = +this.route.snapshot.paramMap.get('id');

      this.messageAdd = new Message();
      // thêm file dạng img vào mảng messages 
      if (file.type == 'image/png' || file.type == 'image/jpeg' || file.type == 'image/jpg') {
        this.messageAdd.src = this.selectedFile.src;
        this.messageAdd.senderId = this.idAmin;
        this.messageAdd.receiveId = id;
        this.messageAdd.type = 'img';
        this.messages.push(this.messageAdd);

      }
      // thêm file dang pdf
      else if (file.type == 'application/pdf') {
        this.messageAdd.src = this.selectedFile.src;
        this.messageAdd.message = file.name;
        this.messageAdd.senderId = this.idAmin;
        this.messageAdd.receiveId = id;
        this.messageAdd.type = 'pdf';

        this.messages.push(this.messageAdd);
      }
      // thêm file dạng word
      else if (
        file.type == 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        this.messageAdd.src = this.selectedFile.src;
        this.messageAdd.message = file.name;
        this.messageAdd.senderId = this.idAmin;
        this.messageAdd.receiveId = id;
        this.messageAdd.type = 'word';

        this.messages.push(this.messageAdd);
      }
      // thêm file dạng excel
      else if (
        file.type == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
        this.messageAdd.src = this.selectedFile.src;
        this.messageAdd.message = file.name;
        this.messageAdd.senderId = this.idAmin;
        this.messageAdd.receiveId = id;
        this.messageAdd.type = 'excel';

        this.messages.push(this.messageAdd);
      }
      // them file dạng powerpoint
      else if (
        file.type == 'application/vnd.openxmlformats-officedocument.presentationml.presentation') {
        this.messageAdd.src = this.selectedFile.src;
        this.messageAdd.message = file.name;
        this.messageAdd.senderId = this.idAmin;
        this.messageAdd.receiveId = id;
        this.messageAdd.type = 'pp';

        this.messages.push(this.messageAdd);
      }




      // console.log(this.messageAdd.src);

    });

    render.readAsDataURL(file);

  }
  // download file
  downloadFile(src: string, name: string) {
    FileSaver.saveAs(src, name);
  }



  //cho thanh cuộn xuống bottom
  // ngAfterViewChecked() {
  //   this.scrollBottom();
  // }
  // @ViewChild('scrollMe') private scroll: ElementRef;
  // scrollBottom() {
  //   // debugger;
  //   this.scroll.nativeElement.scrollTop = this.scroll.nativeElement.scrollHeight;
  // }

  @ViewChild('scrollMe', {static: false}) scrollMe: ElementRef;
  @ViewChildren('item') itemElements: QueryList<any>;
  
  private scrollContainer: any;
  private items = [];

  ngAfterViewInit() {
    this.scrollContainer = this.scrollMe.nativeElement;  
    this.itemElements.changes.subscribe(_ => this.onItemElementsChanged());    

    // Add a new item every 2 seconds
    setInterval(() => {
      this.items.push({});
    }, 2000);
  }
  
  private onItemElementsChanged(): void {
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    this.scrollContainer.scroll({
      top: this.scrollContainer.scrollHeight,
      left: 0,
      behavior: 'smooth'
    });
  }


  // zoom - img
  getClickImg(src) {
    this.checkZoom = true;
    this.imgsrc = src;
  }
  // bỏ zoom ảnh
  UnZoom() {
    this.checkZoom = false;
  }


  // nhấn esc để thay đổi biến checkZoom thành false để thoát zoom ảnh
  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    this.checkZoom = false;
  }


}
