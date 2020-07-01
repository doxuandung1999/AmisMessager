import { Injectable } from '@angular/core';
import { Message} from '../model/message/message';
@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private listMessage : Message[] = [
    {
      idMessage : 1,
      senderId : 2,
      receiveId : 1,
      message : 'hello', 
      time : '07:09'
    },
    {
      idMessage : 1,
      senderId : 2,
      receiveId : 1,
      message : 'hello', 
      time : '07:09'
    },
    {
      idMessage : 1,
      senderId : 2,
      receiveId : 1,
      message : 'hello', 
      time : '07:09'
    },
    {
      idMessage : 1,
      senderId : 2,
      receiveId : 1,
      message : 'hello', 
      time : '07:09'
    },
    {
      idMessage : 1,
      senderId : 2,
      receiveId : 1,
      message : 'hello', 
      time : '07:09'
    },
    
    {
      idMessage : 1,
      senderId : 2,
      receiveId : 1,
      message : 'hello', 
      time : '07:09'
    },
    {
      idMessage : 2,
      senderId : 1,
      receiveId : 2,
      message : 'good morning sdfsdf adasdas asdasd sds asdas asda asdas asda asda sdfs sdfsdf sdfsd sdfs sdf d asdas dasdasd asdasd asdasd asdasd ', 
      time : '07:19'
    },
    {
      idMessage : 3,
      senderId : 1,
      receiveId : 3,
      message : 'hei', 
      time : '07:09'
    },
    {
      idMessage : 4,
      senderId : 3,
      receiveId : 1,
      message : 'hi', 
      time : '07:09'
    }

  ]

  constructor() { }
  getMessage() : Message[]{
    return this.listMessage;
  }
  getMessageId(id : number) : Message[] {
    return this.listMessage.filter(e => (e.senderId === id) ||  e.receiveId === id);
  }
 

  
}
