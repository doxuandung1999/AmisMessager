import { Injectable } from '@angular/core';
import { User } from '../model/user/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private listUser: User[] = [
    {
      id: 1,
      email: 'dungrma99@gmail.com',
      password: 'dung99',
      userName: 'Đỗ Xuân Dũng',
      avatar: '../../assets/Avatar/5.jpg'
    }
    

  ];
  constructor() { }

  getUser(email , password) : User{
    return this.listUser.find(u => u.email === email && u.password === password);
  }


}
