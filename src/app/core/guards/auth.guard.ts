import { AuthState } from '../authentication/store/auth.state';
import { Store } from '@ngxs/store';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private store: Store, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
        const token = this.store.selectSnapshot(AuthState.token);
        const redirectUrl = route['_routerState']['url'];
        if (token) {
            return true;
        }
        this.router.navigateByUrl(
            this.router.createUrlTree(
                ['/login'], {
                    queryParams: {
                        redirectUrl
                    }
                }
            )
        );
        return false;
    }
}
