import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { RawIngredientCategory } from '../interfaces/api/raw-ingredient-category.interface';
import { IngredientCategoryMapper } from '../mappers/ingredient-category.mapper';
import { IngredientCategory } from '../interfaces/recipe/ingredient-category';

export class IngredientCategoryService {
  cache: Observable<IngredientCategory>;
  callbackUrl = 'http://localhost:3333/api/ingredient-categories';

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<IngredientCategory[]> {
    return this.http.get(this.callbackUrl).pipe(
      map((rawData: RawIngredientCategory[]) => {
        return rawData.map((rawIngredientData) => IngredientCategoryMapper.toModel(rawIngredientData));
      })
    );
  }
}
