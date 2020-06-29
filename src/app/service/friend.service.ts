import { Injectable } from '@angular/core';
import {Friend} from '../model/friend/friend';
import {FRIENDS} from '../model/friend/friend-list';

@Injectable({
  providedIn: 'root'
})

export class FriendService {
  constructor() { }
  getFriends() : Friend[] {
    return FRIENDS;
  } 
}
