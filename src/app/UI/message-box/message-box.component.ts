import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
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
import { from } from 'rxjs';
import {ConvidTransferService} from "../../service/convidTransfer.service";




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
  idtest : any; // id conv
  messages : any // mảng chứa tin nhắn trong 1 conversation



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
      this.getTime();
      this.getIdConv();
      this.getLastMessage();
      this.getidUser();
     
    });
   


    console.log(this.accountService.userValue.name);
    // this.stringeeClient.connect();

    this.stringeeService.test();
    // this.stringeeService.creatAConversation(this.user);
    // console.log(this.route.snapshot.paramMap.get('id'));


  }
  ngOndestroy() {
    // this.getId();
  }


  // lấy id conv
  getIdConv(){
    this.convidTransferService.convid.subscribe(data => {this.idtest = data});
  }
  // lấy id user đang nhập
  getidUser(){
    this.idUser  = this.stringeeService.getCurrentUserIdFromAccessToken(this.accountService.userValue.token);
    // console.log(this.idUser);
  }



  // thay đổi biến check để ẩn hiện phần extend component
  showInfor() {
    this.check = !this.check;
  }

  // gửi tin nhắn dạng text vào mảng message
  sendMessage(event) {
    // this.idtest = +this.route.snapshot.paramMap.get('id');
    var message = event.target.value;
    this.stringeeService.sendTextMessage(this.idtest,message);
    event.target.value = null;

  }

  // lấy các message cuối cùng
  getLastMessage(){
    this.stringeeService.getLastMessage(this.idtest,(status, code, message, msgs) => {
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
  ngAfterViewChecked() {
    this.scrollBottom();
  }
  @ViewChild('scrollMe') private scroll: ElementRef;
  scrollBottom() {
    // debugger;
    this.scroll.nativeElement.scrollTop = this.scroll.nativeElement.scrollHeight;
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

  // xét thời gian

  getTime() {
    let date = new Date('2020/07/03 12:40:43');
    let date2 = new Date();
    console.log(date);
    // console.log(Math.floor((date2 - date) / (1000 * 60 * 60 * 24));
    console.log(Math.floor((Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate()) - Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())) / (1000 * 60 * 60 * 24)));

  }


  // nhấn esc để thay đổi biến checkZoom thành false để thoát zoom ảnh
  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    this.checkZoom = false;
  }



}
