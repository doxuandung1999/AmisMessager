import { Component, OnInit, ViewChild, ElementRef, HostListener, ViewChildren, QueryList, Input } from '@angular/core';

import { Friend } from "../../model/friend/friend";
import { RouterModule, Routes, Router } from '@angular/router';
import { ActivatedRoute } from "@angular/router";

import { Message } from '../../model/message/message';
import { User2 } from 'src/app/model/user/user2';
// import { Store } from '@ngrx/store';
// import { UserState, getLogin } from 'src/app/reducer';
import { DataTransferService } from '../../service/dataTransferService';
import { AccountService } from "../../service/accountService";
import { StringeeService } from "../../service/stringee.service";
import { TransferIdUserService } from "../../service/transferIdUser.service";

import { ConvidTransferService } from "../../service/convidTransfer.service";
import { FileService } from "../../service/file.service";
import {UpdateListTransfer} from "../../service/updateListTransfer.service";
import {MessageTransferService} from "../../service/MessageTransfer.service";
import {idConvTransferService} from "../../service/idConvTransfer.service";
import {idUserTransferService} from "../../service/idUserService.service";
import {PostFileService} from "../../service/post-file.service";
import {FileSave} from "../../model/file/file";
import { first } from 'rxjs/operators';



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
  
  userName: any; // tên người đăng nhập
  userInfor = null;
 
  idUrl: any;
  sendFile: any; // xác định loại file cần gửi
  filePath: any;
  idConv : any;
  fileSave : FileSave;

  @Input() messages: any // mảng chứa tin nhắn trong 1 conversation
  idUserInfor: any;

  constructor(
     private route: ActivatedRoute, 
    private router: Router,
    private dataService: DataTransferService,
    private accountService: AccountService,
    private stringeeService: StringeeService,
    private convidTransferService: ConvidTransferService,
    private transferIdUserService: TransferIdUserService,
    private fileService: FileService,
    private updateListTransfer : UpdateListTransfer,
    private messageTransferService : MessageTransferService,
    private idConvTransferService : idConvTransferService,
    private idUserTransferService : idUserTransferService,
    private postFileService : PostFileService
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
      this.messageTransferService.messages.subscribe(data => {
        this.messages = data;
      });

      this.stringeeService.stringeeChat.on('onObjectChange', (info) => {
        this.getLastMessage();
      });

      // this.idConvTransferService.convid.subscribe(data => {
      //   this.idConv = data;
      // });
      // this.idUserTransferService.Userid.subscribe(data => {
      //   this.idUserInfor = data;
      // });
    });

    // console.log(this.idConv);
    
    console.log(this.accountService.userValue.name);
    // this.stringeeClient.connect();

    this.stringeeService.test();


  }
  ngOndestroy() {
    // this.getId();
  }

  // lấy id user đang nhập
  getidUser() {
    this.idUser = this.stringeeService.getCurrentUserIdFromAccessToken(this.accountService.userValue.token);
    // console.log(this.idUser);
  }
  // lấy user name user đăng nhập
  getNameUser() {
    this.userName = this.accountService.userValue.name;
  }

  // lấy id user phía bên kia bắn sang
  getidUserInfor() {
    this.transferIdUserService.userID.subscribe(data => { this.idUserInfor = data });
  }


  // lấy thông tin user phía bên kia đang nhắn tin
  getUserInfor() {
    this.accountService.getById(this.idUserInfor)
      .subscribe(users => this.userInfor = users);
  }

  // truyền id convs sang bên list để thực hiện focus
  postIdConvs() {
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
    this.stringeeService.sendTextMessage(idUrl, message);
    event.target.value = null;
    this.getLastMessage();
    this.updateListTransfer.changeConvid();
  }

  // lấy các message cuối cùng
  getLastMessage() {
    const idUrl = this.route.snapshot.paramMap.get('id');
    this.stringeeService.getLastMessage(idUrl, (status, code, message, msgs) => {
      this.messages = msgs;
      // console.log(msgs);
      
    });
    
    this.updateListTransfer.changeConvid();
  }


 


  // up file
  selectedFile: fileSnippet;
  processImg(fileInput: any) {
    const file: File = fileInput.files[0];
    // console.log(file.name);
    // console.log(file.type);
    const render = new FileReader();

    this.fileSave = new FileSave();
    const idUrl = this.route.snapshot.paramMap.get('id');

    render.addEventListener('load', async (event: any) => {
      this.selectedFile = new fileSnippet(event.target.result, file);
      // với FormData, chúng ta có thể submit dữ liệu lên server thông qua AJAX như là đang submit form bình thường.
      const idUrl = this.route.snapshot.paramMap.get('id');
      var formData = new FormData();
      formData.set("file", file);

      // nếu file input là img
      if (file.type == 'image/png' || file.type == 'image/jpeg' || file.type == 'image/jpg') {

        this.fileService.saveFileToServer(formData, this.accountService.userValue.token).subscribe(data => {
          this.filePath = data;

          this.stringeeService.sendImgMessage(idUrl, this.filePath.filename);
          this.getLastMessage();
          this.updateListTransfer.changeConvid();

          // lưu file img vào database
          this.fileSave.filePath = this.filePath.filename;
          this.fileSave.fileType = "img";
          this.fileSave.fileName = "";
          this.fileSave.convId = idUrl;

          this.postFileService.saveFile(this.fileSave).pipe(first()).subscribe(data => {

          });

        });


      }
      // thêm file dang pdf
      else if (file.type == 'application/pdf') {
        this.fileService.saveFileToServer(formData, this.accountService.userValue.token).subscribe(data => {
          this.filePath = data;
          var fileName = file.name;
          var length = file.size;

          // console.log(fileName + " adsdas" + lenght);

          this.stringeeService.sendFileMessage(idUrl, this.filePath.filename , fileName , length);
          this.getLastMessage();
          this.updateListTransfer.changeConvid();

          // lưu file pdf vào database
          this.fileSave.filePath = this.filePath.filename;
          this.fileSave.fileType = "pdf";
          this.fileSave.fileName = fileName;
          this.fileSave.convId = idUrl;

          this.postFileService.saveFile(this.fileSave).pipe(first()).subscribe(data => {

          });

        });

      }

      // thêm file dạng docs
      else if (file.type == 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        this.fileService.saveFileToServer(formData, this.accountService.userValue.token).subscribe(data => {
          this.filePath = data;
          var fileName = file.name;
          var length = file.size;

          // console.log(fileName + " adsdas" + lenght);

          this.stringeeService.sendFileMessage(idUrl, this.filePath.filename , fileName , length);
          this.getLastMessage();
          this.updateListTransfer.changeConvid();

          // lưu file docs vào database
          this.fileSave.filePath = this.filePath.filename;
          this.fileSave.fileType = "docs";
          this.fileSave.fileName = fileName;
          this.fileSave.convId = idUrl;

          this.postFileService.saveFile(this.fileSave).pipe(first()).subscribe(data => {

          });

        });

      }
      // thêm file dạng excel
      else if ( file.type == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
        this.fileService.saveFileToServer(formData, this.accountService.userValue.token).subscribe(data => {
          this.filePath = data;
          var fileName = file.name;
          var length = file.size;

          // console.log(fileName + " adsdas" + lenght);

          this.stringeeService.sendFileMessage(idUrl, this.filePath.filename , fileName , length);
          this.getLastMessage();
          this.updateListTransfer.changeConvid();

          // lưu file excel vào database
          this.fileSave.filePath = this.filePath.filename;
          this.fileSave.fileType = "excel";
          this.fileSave.fileName = fileName;
          this.fileSave.convId = idUrl;

          this.postFileService.saveFile(this.fileSave).pipe(first()).subscribe(data => {

          });

        });

      }
      // thêm file dạng ppt
      else if (file.type == 'application/vnd.openxmlformats-officedocument.presentationml.presentation') {
        this.fileService.saveFileToServer(formData, this.accountService.userValue.token).subscribe(data => {
          this.filePath = data;
          var fileName = file.name;
          var length = file.size;

          // console.log(fileName + " adsdas" + lenght);

          this.stringeeService.sendFileMessage(idUrl, this.filePath.filename , fileName , length);
          this.getLastMessage();
          this.updateListTransfer.changeConvid();

          // lưu file powerpoint vào database
          this.fileSave.filePath = this.filePath.filename;
          this.fileSave.fileType = "ppt";
          this.fileSave.fileName = fileName;
          this.fileSave.convId = idUrl;

          this.postFileService.saveFile(this.fileSave).pipe(first()).subscribe(data => {

          });

        });

      }
      

    });

    render.readAsDataURL(file);

  }



  // download file
  downloadFile(src: string, name: string) {
    FileSaver.saveAs(src, name);
  }

  // thanh cuộn scroll tự động cuộn xuống
  @ViewChild('scrollMe', { static: false }) scrollMe: ElementRef;
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
