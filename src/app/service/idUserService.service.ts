import { Injectable, EventEmitter, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class idUserTransferService {

  constructor() { }
  
  @Output() Userid = new EventEmitter<any>();
  // bắt sự kiện thay đổi conv id
  changeConvid(id){
    this.Userid.emit(id);
  }
}