import { Injectable, EventEmitter, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UpdateAsReadTransfer {

  constructor() { }
  
  @Output() asRead = new EventEmitter<boolean>();
  // bắt sự kiện thay đổi trong message để up date á read
  changeAsRead(){
    this.asRead.emit(true);
  }
}