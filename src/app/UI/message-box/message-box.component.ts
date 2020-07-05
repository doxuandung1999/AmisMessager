import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FriendService } from "../../service/friend.service";
import { Friend } from "../../model/friend/friend";
import { RouterModule, Routes, Router } from '@angular/router';
import { ActivatedRoute } from "@angular/router";
import { MessageService } from '../../service/message.service';
import { Message } from '../../model/message/message';
import { User } from 'src/app/model/user/user';
import { Store } from '@ngrx/store';
import { UserState, getLogin } from 'src/app/reducer';


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
  messages: Message[];
  messageAdd: Message;
  idAmin = 1;
  friend_1;
  checkMessage = true;
  check = false;
  imgsrc : string;
  checkZoom = false;
  users : User[];
  
  constructor(private friendService: FriendService
    , private route: ActivatedRoute, private messageService: MessageService,
    private _store:Store<UserState>,private router:Router) {
    
    // login
    this._store.select(getLogin).subscribe(item=>{
      this.users = item;
      // this.idAmin = this.users[0].id;
    });

  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(x => {
      this.getId();
      this.getMessage();



    });



  }
  ngOndestroy() {
    this.getId();
    // this.getMessage();


  }
  getId() {

    const id = +this.route.snapshot.paramMap.get('id');
    this.friends = this.friendService.getFriendId(id);

  }

  getMessage() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.messages = this.messageService.getMessageId(id);

  }


  showInfor() {
    this.check = !this.check;
  }
  showMessage(event) {
    const id = +this.route.snapshot.paramMap.get('id');
    this.messageAdd = new Message();
    this.messageAdd.message = event.target.value;
    this.messageAdd.senderId = this.idAmin;
    this.messageAdd.receiveId = id;
    this.messageAdd.type = 'text';

    this.messages.push(this.messageAdd);
    event.target.value = null;
  }

  // up file
  selectedFile: fileSnippet;
  processImg(fileInput: any) {
    const file: File = fileInput.files[0];
    console.log(file.name);
    console.log(file.type);
    const render = new FileReader();

    render.addEventListener('load', (event: any) => {
      this.selectedFile = new fileSnippet(event.target.result, file);
      const id = +this.route.snapshot.paramMap.get('id');
      this.messageAdd = new Message();
      if (file.type == 'image/png' || file.type == 'image/jpeg' || file.type == 'image/jpg') {
        this.messageAdd.src = this.selectedFile.src;
        this.messageAdd.senderId = this.idAmin;
        this.messageAdd.receiveId = id;
        this.messageAdd.type = 'img';
        this.messages.push(this.messageAdd);
      }
      else if (file.type == 'application/pdf') {
        this.messageAdd.src = this.selectedFile.src;
        this.messageAdd.message = file.name;
        this.messageAdd.senderId = this.idAmin;
        this.messageAdd.receiveId = id;
        this.messageAdd.type = 'pdf';
       
        this.messages.push(this.messageAdd);
      }
      else if (
        file.type == 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        this.messageAdd.src = this.selectedFile.src;
        this.messageAdd.message = file.name;
        this.messageAdd.senderId = this.idAmin;
        this.messageAdd.receiveId = id;
        this.messageAdd.type = 'word';
        
        this.messages.push(this.messageAdd);
      }
      else if (
        file.type == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
        this.messageAdd.src = this.selectedFile.src;
        this.messageAdd.message = file.name;
        this.messageAdd.senderId = this.idAmin;
        this.messageAdd.receiveId = id;
        this.messageAdd.type = 'excel';
        
        this.messages.push(this.messageAdd);
      }
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



  // thanh cuộn 
  ngAfterViewChecked() {
    this.scrollBottom();
  }
  @ViewChild('scrollMe') private scroll: ElementRef;
  scrollBottom() {
    // debugger;
    this.scroll.nativeElement.scrollTop = this.scroll.nativeElement.scrollHeight;
  }

  // zoom - img
  getClickImg(src){
    this.checkZoom = true;
    this.imgsrc = src;
  }

  UnZoom(){
    this.checkZoom = false;
  }

  







}
