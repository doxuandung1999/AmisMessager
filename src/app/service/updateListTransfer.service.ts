import { Injectable, EventEmitter, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UpdateListTransfer {

  constructor() { }
  
  @Output() onupdate = new EventEmitter<boolean>();
  // bắt sự kiện thay đổi conv id
  changeConvid(){
    this.onupdate.emit(true);
  }
}