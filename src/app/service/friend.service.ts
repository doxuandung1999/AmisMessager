import { Injectable, Output, EventEmitter } from '@angular/core';
import {Friend} from '../model/friend/friend';


@Injectable
({
  providedIn: 'root'
})

export class FriendService {
  private listFriend : Friend[] = [
    {   
      id:2,
      name : 'Đào Đức Khiêm',
      avatar : '../../../assets/Avatar/2.jpg',
      status : true,
      lastMassage : 'mai đá bóng nhá',
      time : "13:00",
      noRep : 0,
      senderId : 2,
      number:'0975255650',
      email :'khiem@gmail.com',
      timeActive : 'Đang hoạt động'
  },
  {   
      id:3,
      name : 'Nguyễn Văn Minh',
      avatar : '../../../assets/Avatar/3.jpg',
      status : false,
      lastMassage : 'ngày mai có lịch họp nhé',
      time : '14:30',
      noRep : 2,
      senderId : 1,
      number:'0912223450',
      email :'Minh@gmail.com',
      timeActive : 'Hoạt động 1 giờ truóc'
  },
  {   
      id:4,
      name : 'Hoàng Cao Phi',
      avatar : '../../../assets/Avatar/4.jpg',
      status : true,
      lastMassage : 'gửi báo cáo đây',
      time : '14:30',
      noRep : 5,
      senderId : 4,
      number:'0973266950',
      email :'Phi@gmail.com',
      timeActive : 'Đang hoạt động'

  },
  {   
      id:5,
      name : 'Hải Dương',
      avatar : '../../../assets/Avatar/5.jpg',
      status : false,
      lastMassage : 'nhớ làm bài tập đấy',
      time : '14:30',
      noRep : 0,
      senderId : 1,
      number:'0915379413',
      email :'Duong@gmail.com',
      timeActive : 'Hoạt động 15 phút truóc'
  }
    
  ];
  getFriend() : Friend[]{
    return this.listFriend;
  }
 
  getFriendId(id : number) : Friend{
    return this.listFriend.find(e => e.id === id);
  }
  checkRep(id : number , id_2 : number) : boolean{
    if(this.getFriendId(id).id === id_2){
      return true;
    }
    return false;

  }
  @Output() userId = new EventEmitter<number>();
  changeUser(id){
    this.userId.emit(id);
  }

  
  
 
}
