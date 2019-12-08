import { RawIngredient } from '../interfaces/api/raw-ingredient.interface';
import { Ingredient } from '../interfaces/recipe/ingredient.interface';

export class IngredientMapper {

  public static toModel(rawIngredient: RawIngredient): Ingredient {
    return {
      id: rawIngredient._id,
      name: rawIngredient.name,
      category: rawIngredient.category
    };
  }
}
