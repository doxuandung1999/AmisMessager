import { Injectable, EventEmitter, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataTransferService {

  constructor() { }
  
  @Output() userID = new EventEmitter<number>();
  // bắt sự kiện thay đổi id
  changeUser(id){
    this.userID.emit(id);
  }
}