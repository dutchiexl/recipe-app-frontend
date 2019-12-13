import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngxs/store';
import { map } from 'rxjs/operators';
import { AuthResponse } from '../interfaces/raw-auth-response.interface';

@Injectable()
export class AuthService {
    callbackUrl = environment.apiUrl + 'auth/login';

    constructor(
        private http: HttpClient,
        private store: Store
    ) {
    }

    login(username: string, password: string): Observable<AuthResponse> {
        return this.http.post(this.callbackUrl, {username: username, password: password}).pipe(
            map((authResponse: AuthResponse) => {
                console.log(authResponse);
                return authResponse;
            })
        );
    }
}
