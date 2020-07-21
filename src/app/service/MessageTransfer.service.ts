import { Injectable, EventEmitter, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageTransferService {

  constructor() { }
  
  @Output() messages = new EventEmitter<[]>();
  // bắt sự kiện thay đổi message ở mỗi convs
  changeMessage(value : []){
    this.messages.emit(value);
  }
}