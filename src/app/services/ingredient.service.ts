import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { IngredientCategory } from '../interfaces/recipe/ingredient-category';
import { Ingredient } from '../interfaces/recipe/ingredient.interface';
import { RawIngredient } from '../interfaces/api/raw-ingredient.interface';
import { IngredientMapper } from '../mappers/ingredient.mapper';
import { IngredientUtil } from '../utils/ingredient.util';

export class IngredientService {
  cache: Observable<IngredientCategory>;
  callbackUrl = 'http://localhost:3333/api/ingredients';

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<Ingredient[]> {
    return this.http.get(this.callbackUrl).pipe(
      map((rawData: RawIngredient[]) => {
        return rawData.map((rawIngredientData) => IngredientMapper.toModel(rawIngredientData));
      })
    );
  }

  create(ingredient: Ingredient): Observable<Ingredient> {
    return this.http.post(this.callbackUrl, IngredientUtil.asJson(ingredient)).pipe(
      map((rawIngredient: RawIngredient) => {
        return IngredientMapper.toModel(rawIngredient);
      })
    );
  }
}
