import { Injectable, EventEmitter, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IdFocusTranferService {

  constructor() { }
  
  @Output() convId = new EventEmitter<any>();
  // bắt sự kiện thay đổi id
  changeFocus(id){
    this.convId.emit(id);
  }
}