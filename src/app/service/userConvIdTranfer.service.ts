import { Injectable, EventEmitter, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserConvIdTranferService {

  constructor() { }
  
  @Output() userId = new EventEmitter<any>();
  // bắt sự kiện thay đổi id
  userTransferconvId(id){
    this.userId.emit(id);
  }
}