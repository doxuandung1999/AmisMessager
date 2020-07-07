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
      time : '07:09',
      type : 'text'
    },
    {
      idMessage : 1,
      senderId : 2,
      receiveId : 1,
      time : '07:09',
      type : 'img',
      src : '../../assets/File/ronaldo juv.jpg'
    },
    {
      idMessage : 1,
      senderId : 2,
      receiveId : 1,
      time : '07:09',
      type : 'pdf',
      message : 'review.pdf',
      src : '../../assets/File/review.pdf'
    },
    {
      idMessage : 1,
      senderId : 1,
      receiveId : 2,
      time : '07:09',
      type : 'word',
      message : 'TestDocs.docx',
      src : '../../assets/File/TestDocs.docx'
    },
    
    {
      idMessage : 2,
      senderId : 1,
      receiveId : 2,
      message : 'good morning sdfsdf adasdas asdasd sds asdas asda asdas asda asda sdfs sdfsdf sdfsd sdfs sdf d asdas dasdasd asdasd asdasd asdasd ', 
      time : '07:19',
      type : 'text'
    },
    {
      idMessage : 3,
      senderId : 1,
      receiveId : 3,
      message : 'hei', 
      time : '07:09',
      type : 'text'
    },
    {
      idMessage : 4,
      senderId : 3,
      receiveId : 1,
      message : 'hi', 
      time : '07:09',
      type : 'text'
    },
    {
      idMessage : 4,
      senderId : 1,
      receiveId : 4,
      message : 'asd sa sd', 
      time : '07:09',
      type : 'text'
    },
    {
      idMessage : 4,
      senderId : 4,
      receiveId : 1,
      message : 'fgfdg dsfgdf', 
      time : '07:09',
      type : 'text'
    },
    {
      idMessage : 4,
      senderId : 5,
      receiveId : 1,
      message : 'fdsfs fdd er sd', 
      time : '07:09',
      type : 'text'
    },
    {
      idMessage : 4,
      senderId : 1,
      receiveId : 5,
      message : 'asd opik sd', 
      time : '07:09',
      type : 'text'
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
