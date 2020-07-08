import { Component, OnInit , Input , ElementRef, ViewChild, HostListener} from '@angular/core';
import {Friend} from "../../model/friend/friend";
import {FriendService} from "../../service/friend.service";
import {ActivatedRoute} from "@angular/router";
import {Message} from "../../model/message/message";
import {DataTransferService} from '../../service/dataTransferService';

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
  // lấy mảng message tử component cha
   @Input() message : Message[];

  constructor( private friendService : FriendService , 
    private route : ActivatedRoute,
    private dataService : DataTransferService) { 
      this.route.paramMap.subscribe(x => {
        this.getId();
      });
    }
    // lấy id trên thanh URL
  getId(){
    const id = +this.route.snapshot.paramMap.get('id');
    this.friends = this.friendService.getFriendId(id);
    
  }
  ngOndestroy(){
    
  }
  ngOnInit(): void {
    
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