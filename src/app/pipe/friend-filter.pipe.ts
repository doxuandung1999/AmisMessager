import { Pipe, PipeTransform } from '@angular/core';
import {Friend} from '../model/friend/friend';
import {User2} from "../model/user/user2";

@Pipe({
  name: 'friendFilter'
})
export class FriendFilterPipe implements PipeTransform {

  // viết pipe để lấy các friend theo ký tự search đc
  transform(friends: Friend[], searchFriend : string): Friend[] {
    if(!friends || !searchFriend){
      return friends;
    }
    return friends.filter(friend => friend.name.toLocaleLowerCase().indexOf(searchFriend.toLocaleLowerCase()) !== -1);
  }

}
