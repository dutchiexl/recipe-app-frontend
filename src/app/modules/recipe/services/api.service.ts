import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { AuthState } from '../../../core/authentication/store/auth.state';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class ApiService {
    token: string;

    constructor(store: Store) {
        store.select(AuthState.getToken).subscribe((token) => {
            this.token = token;
        });
    }

    getHeader(): HttpHeaders {
        return new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.token}`
        });
    }
}
