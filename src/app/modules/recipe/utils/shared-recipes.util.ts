import {SharedRecipe} from "../interfaces/recipe/shared-recipe.interface";
import {RawSharedRecipe} from "../interfaces/api/raw-shared-recipe.interface";

export class SharedRecipesUtil {
    static createShareObject(recipeId: string, userId: string): SharedRecipe {
        return {
            recipeId: recipeId,
            userId: userId
        }
    }

    static sharedRecipeAsJSON(sharedRecipe: SharedRecipe): RawSharedRecipe {
        return {
            recipeId: sharedRecipe.recipeId,
            userId: sharedRecipe.userId
        }
    }
}
