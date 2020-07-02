import { Component, OnInit } from '@angular/core';
import {FriendService} from "../../service/friend.service";
import {Friend} from "../../model/friend/friend";
import { RouterModule, Routes} from '@angular/router';
import {ActivatedRoute} from "@angular/router";
import {MessageService} from '../../service/message.service';
import {Message} from '../../model/message/message';

class ImageSnippet{
  constructor(public src: string , public file: File){}
}
class fileSnippet{
  constructor(public src : string , public file : File){}
}
@Component({
  selector: 'app-message-box',
  templateUrl: './message-box.component.html',
  styleUrls: ['./message-box.component.scss']
})

export class MessageBoxComponent implements OnInit {

  friends : Friend;
  messages : Message[];
  messageAdd : Message;
  idAmin = 1;
  friend_1;
  checkMessage = true;
  check = false;

  constructor(private friendService : FriendService 
    , private route: ActivatedRoute , private messageService : MessageService) {
      
    
   }
  
  ngOnInit(): void {
    this.route.paramMap.subscribe(x => {
      this.getId();
      this.getMessage();
      
    });
  
  }
  ngOndestroy(){
    this.getId();
    // this.getMessage();
    
  
  }
  getId(){

    const id = +this.route.snapshot.paramMap.get('id');
    this.friends = this.friendService.getFriendId(id);
    
  }

  getMessage(){
    const id = +this.route.snapshot.paramMap.get('id');
    this.messages= this.messageService.getMessageId(id);
  
  }
  

  showInfor(){
    this.check = !this.check;
  }
  showMessage(event){
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
  selectedFile : ImageSnippet;
  processImg(imageImput : any){
    const file : File = imageImput.files[0];
    console.log(file)
    const render = new FileReader();

    render.addEventListener('load', (event : any) => {
      this.selectedFile = new ImageSnippet(event.target.result , file);
      const id = +this.route.snapshot.paramMap.get('id');
      this.messageAdd = new Message();
      this.messageAdd.src = this.selectedFile.src;
      this.messageAdd.senderId = this.idAmin;
      this.messageAdd.receiveId = id;
      this.messageAdd.type = 'img';

      this.messages.push(this.messageAdd);
      console.log(this.messageAdd.src);

    });

    render.readAsDataURL(file);

  }

  selectedFile_1 : fileSnippet;
  processFile(fileInput : any){
    const file : File = fileInput.files[0];

  }


}
