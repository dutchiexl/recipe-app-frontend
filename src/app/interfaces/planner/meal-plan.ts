import { Recipe } from '../recipe/recipe.interface';

export interface MealPlan {
  id?: string;
  name: string;
  recipes: Recipe[];
}
