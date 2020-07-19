import { Injectable, EventEmitter, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TransferIdUserService {

  constructor() { }
  
  @Output() userID = new EventEmitter<any>();
  // bắt sự kiện thay đổi id
  changeIdUser(id){
    this.userID.emit(id);
  }
}