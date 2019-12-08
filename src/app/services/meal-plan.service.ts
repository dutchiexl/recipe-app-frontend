import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { MealPlan } from '../interfaces/planner/meal-plan';
import { RawMealPlan } from '../interfaces/api/raw-meal.plan';
import { MealPlanMapper } from '../mappers/meal-plan.mapper';
import { RecipeService } from './recipe.service';
import { MealPlanUtil } from '../utils/mealPlanUtil';
import { Recipe } from '../interfaces/recipe/recipe.interface';
import { RecipeUtil } from '../utils/recipe.util';

@Injectable()
export class MealPlanService {

  callbackUrl = 'http://localhost:3333/api/mealplans';

  constructor(
    private http: HttpClient,
    private recipeService: RecipeService
  ) {}

  getAll(): Observable<MealPlan[]> {
    return this.recipeService.getRecipes().pipe(
      mergeMap((recipes) => {
        return this.http.get(this.callbackUrl).pipe(
          map((rawData: RawMealPlan[]) => {
            return rawData.map((RawMealPlan) => MealPlanMapper.toObject(RawMealPlan, recipes));
          })
        )
      })
    );
  }

  create(mealPlan: MealPlan): Observable<Object> {
    return this.http.post(this.callbackUrl, MealPlanUtil.asJson(mealPlan));
  }

  update(mealPlan: MealPlan) {
    return this.http.patch(this.callbackUrl + '/' + mealPlan.id, MealPlanUtil.asJson(mealPlan));
  }

  delete(mealPlan: MealPlan) {
    return this.http.delete(this.callbackUrl + '/' + mealPlan.id);
  }

  updateRecipes(plan: MealPlan, recipes: Recipe[]) {
    return this.http.patch(this.callbackUrl + '/' + plan.id, RecipeUtil.recipeListAsJson(recipes));
  }
}
