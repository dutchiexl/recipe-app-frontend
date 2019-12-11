import { AuthState } from '../authentication/store/auth.state';
import { Store } from '@ngxs/store';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';
import { Navigate } from '@ngxs/router-plugin';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private store: Store) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
        const token = this.store.selectSnapshot(AuthState.token);
        if (token) {
            return true;
        }
        console.log('kak');
        this.store.dispatch(new Navigate(['/login']));
        return false;
    }
}
