import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { RecipeCategory } from '../interfaces/recipe/recipe-category';
import { RawRecipeCategory } from '../interfaces/api/raw-recipe-category.interface';
import { RecipeCategoryMapper } from '../mappers/recipe-category.mapper';

export class RecipeCategoryService {
    cache: Observable<RecipeCategory>;
    callbackUrl = environment.apiUrl + 'api/recipe-categories';

    constructor(private http: HttpClient) {
    }

    getAll(): Observable<RecipeCategory[]> {
        return this.http.get(this.callbackUrl).pipe(
            map((rawData: RawRecipeCategory[]) => {
                return rawData.map((rawItem) => RecipeCategoryMapper.toModel(rawItem));
            })
        );
    }
}
