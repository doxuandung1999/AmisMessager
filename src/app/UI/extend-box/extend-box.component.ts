import { Component, OnInit , Input , ElementRef, ViewChild} from '@angular/core';
import {Friend} from "../../model/friend/friend";
import {FriendService} from "../../service/friend.service";
import {ActivatedRoute} from "@angular/router";
import {Message} from "../../model/message/message";

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
   @Input() message : Message[];

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

  // zoom img
  getClickImg(src){
    this.checkZoom = true;
    this.imgsrc = src;
  }

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
  

}