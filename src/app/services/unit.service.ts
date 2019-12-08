import { Unit } from '../interfaces/unit/unit';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { RawUnit } from '../interfaces/api/raw-unit.interface';
import { UnitMapper } from '../mappers/unit.mapper';

export class UnitService {
  cache: Observable<Unit>;
  callbackUrl = 'http://localhost:3333/api/units';

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<Unit[]> {
    return this.http.get(this.callbackUrl).pipe(
      map((rawData: RawUnit[]) => {
        return rawData.map((rawUnitData) => UnitMapper.toModel(rawUnitData));
      })
    );
  }
}
