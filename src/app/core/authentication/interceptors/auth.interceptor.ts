import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { AuthState } from '../store/auth.state';
import { LogoutAction } from '../store/auth.actions';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(
        private router: Router,
        private store: Store
    ) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.store.selectSnapshot(AuthState.token);
        if (token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            });
        }

        return next.handle(request).pipe(tap(() => {},
            (err: any) => {
                if (err instanceof HttpErrorResponse) {
                    if (err.status !== 401) {
                        return;
                    }
                    this.store.dispatch(new LogoutAction());
                }
            })
        );
    }
}
