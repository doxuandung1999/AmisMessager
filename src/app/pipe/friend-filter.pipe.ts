import { Pipe, PipeTransform } from '@angular/core';
import { User2 } from "../model/user/user2";
import { AccountService } from "../service/accountService";
import { first } from 'rxjs/operators';

@Pipe({
  name: 'friendFilter'
})
export class FriendFilterPipe implements PipeTransform {


  // viết pipe để lấy các User theo ký tự search đc
  transform(friends: any[], searchFriend: string): any[] {
    if (!friends || !searchFriend) {
      return friends;
    }
    return friends.filter(friend => friend.userName.toLocaleLowerCase().indexOf(searchFriend.toLocaleLowerCase()) !== -1);
    
  }


}
