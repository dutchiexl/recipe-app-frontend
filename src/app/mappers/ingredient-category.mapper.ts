import { RawIngredientCategory } from '../interfaces/api/raw-ingredient-category.interface';
import { IngredientCategory } from '../interfaces/recipe/ingredient-category';

export class IngredientCategoryMapper {
  public static toModel(rawIngredientCategory: RawIngredientCategory): IngredientCategory {
    return {
      id: rawIngredientCategory._id,
      name: rawIngredientCategory.name,
    };
  }
}
