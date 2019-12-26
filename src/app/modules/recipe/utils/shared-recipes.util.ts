import {SharedRecipe} from '../interfaces/recipe/shared-recipe.interface';
import {RawSharedRecipe} from '../interfaces/api/raw-shared-recipe.interface';
import {Recipe} from '../interfaces/recipe/recipe.interface';
import {SharedUser} from '../interfaces/user/shared-user.interface';

export class SharedRecipesUtil {
    static createShareObject(recipe: Recipe, sharedUser: SharedUser): SharedRecipe {
        return {
            recipe: recipe,
            sharedUser: sharedUser
        };
    }

    static sharedRecipeAsJSON(sharedRecipe: SharedRecipe): RawSharedRecipe {
        return {
            recipeId: sharedRecipe.recipe.id,
            userId: sharedRecipe.sharedUser.id
        };
    }
}
