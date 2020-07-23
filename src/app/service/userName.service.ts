import { Injectable, EventEmitter, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class userNameService {

  constructor() { }
  
  @Output() userNameTransfer = new EventEmitter<any>();
  @Output() emailTransfer = new EventEmitter<any>();
  @Output() phoneTransfer = new EventEmitter<any>();
  // bắt sự kiện thay đổi id
  transferUsername(name){
    this.userNameTransfer.emit(name);
  }
  
  transferEmail(email){
    this.emailTransfer.emit(email);
  }
  transferPhone(phone){
    this.phoneTransfer.emit(phone);
  }
}