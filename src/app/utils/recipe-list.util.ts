import { Recipe } from '../interfaces/recipe/recipe.interface';

export class RecipeListUtil {

  public static findRecipeById(recipes: Recipe[], recipeId: string): Recipe {
    return recipes.find((recipe) => {
      return recipe.id === recipeId;
    });
  }
}
