import {Recipe} from "./recipe.interface";
import {SharedUser} from "../user/shared-user.interface";

export interface SharedRecipe {
    recipe: Recipe;
    sharedUser: SharedUser;
}