import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngxs/store';

@Injectable()
export class AuthService {
    callbackUrl = environment.apiUrl + 'auth/login';

    constructor(
        private http: HttpClient,
        private store: Store
    ) {
    }

    login(username: string, password: string): Observable<any> {
        return this.http.post(this.callbackUrl, {username: username, password: password});
    }
}
