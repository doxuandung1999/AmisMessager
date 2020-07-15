import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AccountService } from '../service/accountService';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private accountService: AccountService
    ) {}
        // xác thực xem người dùng đã đăng nhập chưa , sử dụng method canActivate nếu đn rồi trả về true , nếu ko quay về trang sign in
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const user = this.accountService.userValue;
        if (user) {
            // thỏa mãn
            return true;
        }

        // ko thỏa mãn sẽ quay về trang signin
        this.router.navigate(['/signIn'] , { queryParams: { returnUrl: state.url }});
        
        return false;
    }
}