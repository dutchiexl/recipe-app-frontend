import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AuthService {
    callbackUrl = environment.apiUrl + 'auth/login';

    constructor(private http: HttpClient) {
    }

    login(username: string, password: string): Observable<any> {
        return of();
    }

    logout(token: string): Observable<any> {
        return of();
    }
}
