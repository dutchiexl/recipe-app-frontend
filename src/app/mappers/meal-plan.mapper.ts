import { RawMealPlan } from '../interfaces/api/raw-meal.plan';
import { MealPlan } from '../interfaces/planner/meal-plan';
import { Recipe } from '../interfaces/recipe/recipe.interface';

export class MealPlanMapper {

  public static toObject(rawData: RawMealPlan, recipes: Recipe[]): MealPlan {
    return {
      id: rawData._id,
      name: rawData.name,
      recipes: rawData.recipes.map((recipeId) => {
        return recipes.find((recipe) => recipe.id === recipeId);
      })
    };
  }
}
