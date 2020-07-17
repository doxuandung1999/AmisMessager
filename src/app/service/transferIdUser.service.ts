import { Injectable, EventEmitter, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TransferIdUserService {

  constructor() { }
  
  @Output() userID = new EventEmitter<string>();
  // bắt sự kiện thay đổi id
  changeIdUser(id : string){
    this.userID.emit(id);
  }
}