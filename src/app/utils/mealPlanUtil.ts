import { MealPlan } from '../interfaces/planner/meal-plan';
import { RawMealPlan } from '../interfaces/api/raw-meal.plan';

export class MealPlanUtil {
  public static createEmpty(): MealPlan {
    return {
      name: null,
      recipes: []
    }
  }

  static asJson(mealPlan: MealPlan): RawMealPlan {
    return {
      name: mealPlan.name,
      recipes: mealPlan.recipes.map((recipe) => recipe.id),
    }
  }
}
