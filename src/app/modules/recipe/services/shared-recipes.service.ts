import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Recipe } from '../interfaces/recipe/recipe.interface';
import {RecipeUtil} from "../utils/recipe.util";
import {SharedRecipe} from "../interfaces/recipe/shared-recipe.interface";
import {SharedRecipesUtil} from "../utils/shared-recipes.util";

@Injectable()
export class SharedRecipesService {
    cache: Observable<Recipe>;
    callbackUrl = environment.apiUrl + 'api/sharedrecipes';

    constructor(
        private http: HttpClient
    ) {}

    shareRecipe(sharedRecipe: SharedRecipe) {
        return this.http.post(this.callbackUrl, SharedRecipesUtil.sharedRecipeAsJSON(sharedRecipe));
    }
}