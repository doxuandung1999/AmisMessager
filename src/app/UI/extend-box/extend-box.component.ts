import { Component, OnInit , Input , ElementRef, ViewChild, HostListener} from '@angular/core';
import {Friend} from "../../model/friend/friend";

import {ActivatedRoute} from "@angular/router";
import {Message} from "../../model/message/message";
import {DataTransferService} from '../../service/dataTransferService';
import {TransferIdUserService} from "../../service/transferIdUser.service";
import {AccountService} from "../../service/accountService";
import {PostFileService} from "../../service/post-file.service";
import { first } from 'rxjs/operators';
import {UpdateListTransfer} from "../../service/updateListTransfer.service";

declare var require: any
const FileSaver = require('file-saver');

@Component({
  selector: 'app-extend-box',
  templateUrl: './extend-box.component.html',
  styleUrls: ['./extend-box.component.scss']
})
export class ExtendBoxComponent implements OnInit {
  checkFile = true;
  checkImg = true;
  friends : Friend;
  imgsrc : string;
  checkZoom = false;
  idUserInfor : any ; // lấy id user phía bên kia
  // userInfor = null; // user phía bên nhận
  fileSave : any;

  // lấy mảng message tử component cha
   @Input() message : Message[];
   @Input() userInfor = null;
   
  constructor(
    private route : ActivatedRoute,
    private dataService : DataTransferService,
    private transferIdUserService : TransferIdUserService,
    private accountService : AccountService,
    private postFileService : PostFileService,
    private updateListTransfer: UpdateListTransfer) { 
      
    }

  ngOndestroy(){
    
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe(x => {
      this.getFile();
      this.getUpdate();
    });
    
  }

  getFile(){
    const idUrl = this.route.snapshot.paramMap.get('id');
    this.postFileService.getFileById(idUrl).pipe(first()).subscribe(data => {
      this.fileSave = data;
    });
  }

  // bắt sự kiện update bên message
  getUpdate(){
    this.updateListTransfer.onupdate.subscribe(data => {
      this.getFile();
    });
  }


  // ẩn hiện phần xem các file trong đoạn hội thoại
  showFile(){
    this.checkFile = !this.checkFile;
  }
  showImg(){
    this.checkImg = !this.checkImg;
  }

  // zoom img
  getClickImg(src){
    this.checkZoom = true;
    this.imgsrc = src;
  }
  // bỏ zoom img khi click
  UnZoom(){
    this.checkZoom = false;
  }
  
  // download file
  downloadFile(src : string , name:string){
    FileSaver.saveAs(src , name);
  }

  // thanh cuộn
    ngAfterViewChecked() {
      this.scrollBottom();
      this.scrollBottom_2();
    }
    @ViewChild('scrollMe') private scroll: ElementRef;
    scrollBottom() {
      // debugger;
      this.scroll.nativeElement.scrollTop = this.scroll.nativeElement.scrollHeight;
    }
    @ViewChild('scrollMe_2') private scroll_2: ElementRef;
    scrollBottom_2() {
      // debugger;
      this.scroll_2.nativeElement.scrollTop = this.scroll_2.nativeElement.scrollHeight;
    }
  
     // nhấn esc để thay đổi biến checkZoom thành false để thoát zoom ảnh
  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    this.checkZoom = false;
  }

  

}