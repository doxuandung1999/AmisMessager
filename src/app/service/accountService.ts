import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';

import {User2} from "../model/user/user2";
import {UserUpdate} from "../model/user/userUpdate";

@Injectable({ providedIn: 'root' })
export class AccountService {
    private userSubject: BehaviorSubject<User2>;
    private userSubject_2 : BehaviorSubject<User2>;
    public user: Observable<User2>;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.userSubject = new BehaviorSubject<User2>(JSON.parse(localStorage.getItem('user')));
        this.userSubject_2 = new BehaviorSubject<User2>(JSON.parse(localStorage.getItem('user')));
        this.user = this.userSubject.asObservable();
    
    }

    // lấy thông tin User
    public get userValue(): User2 {
        return this.userSubject.value;
    }

    login(user : User2) {
        return this.http.post<User2>(`${environment.apiUrl}/api/Users/authenticate`, user )
            .pipe(map(users => {
              
                // lưu user và jwt trong local storage để giữ login khi làm mới trang
                localStorage.setItem('user', JSON.stringify(users));
                this.userSubject.next(users);
                return users;
            }));
    }

    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('user');
        this.userSubject.next(null);
        this.router.navigate(['/signIn']);
    }

    register(user : User2) {
        // console.log("register");
        return this.http.post(`${environment.apiUrl}/api/Users/register`, user);
    }

    // lấy tất cả user
    getAll() {
        return this.http.get<User2[]>(`${environment.apiUrl}/api/Users/getall`);
    }

    getById(id: any) {
        return this.http.get<User2>(`${environment.apiUrl}/api/Users/${id}`);
    }

    update(params : UserUpdate) {
        return this.http.put(`${environment.apiUrl}/api/Users/updateProfile`, params)
            .pipe(map(x => {
                // update stored user if the logged in user updated their own record
                if (params.userId  == this.userValue.id) {
                    // update local storage
                    const user = { ...this.userValue, ...params };
                    localStorage.setItem('user', JSON.stringify(user));
                    // publish updated user to subscribers
                    this.userSubject.next(user);
                    
                }
                return x;
            }));
            
    }

    // delete(id: string) {
    //     return this.http.delete(`${environment.apiUrl}/users/${id}`)
    //         .pipe(map(x => {
    //             // auto logout if the logged in user deleted their own record
    //             if (id == this.userValue.id) {
    //                 this.logout();
    //             }
    //             return x;
    //         }));
    // }
}