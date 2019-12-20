import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import {SharedUser} from "../interfaces/user/shared-user.interface";
import {RawSharedUser} from "../interfaces/api/raw-shared-user.interface";
import {SharedUserMapper} from "../mappers/shared-user.mapper";

export class SharedUserService {
    callbackUrl = environment.apiUrl + 'api/shared-users';

    constructor(private http: HttpClient) {
    }

    getAll(): Observable<SharedUser[]> {
        return this.http.get(this.callbackUrl).pipe(
            map((rawData: RawSharedUser[]) => {
                return rawData.map((RawSharedUser) => SharedUserMapper.toModel(RawSharedUser));
            })
        );
    }
}
