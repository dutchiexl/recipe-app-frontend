import { RawRecipeCategory } from '../interfaces/api/raw-recipe-category.interface';
import { RecipeCategory } from '../interfaces/recipe/recipe-category';

export class RecipeCategoryMapper {
    public static toModel(rawRecipeCategory: RawRecipeCategory): RecipeCategory {
        return {
            id: rawRecipeCategory._id,
            name: rawRecipeCategory.name,
        };
    }
}
