import { Injectable, EventEmitter, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataTransferService {

  constructor() { }
  
  @Output() userID = new EventEmitter<number>();

  changeUser(id){
    this.userID.emit(id);
  }
}