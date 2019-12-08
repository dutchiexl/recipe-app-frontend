import { Recipe } from '../interfaces/recipe/recipe.interface';
import { RawRecipe } from '../interfaces/api/raw-recipe.interface';
import { StepMapper } from './step.mapper';
import { Unit } from '../interfaces/unit/unit';
import { Ingredient } from '../interfaces/recipe/ingredient.interface';

export class RecipeMapper {

  public static toObject(rawData: RawRecipe, units: Unit[], ingredients: Ingredient[]): Recipe {
    return {
      id: rawData._id,
      name: rawData.name,
      nameAddition: rawData.nameAddition,
      description: rawData.description,
      imagePath: rawData.imagePath,
      creationDate: new Date(rawData.creationDate),
      items: rawData.items.map((rawItem) => {
        return {
          amount: rawItem.amount,
          unit: units.find((unit) => unit.id === rawItem.unit),
          ingredient: ingredients.find((ingredient) => ingredient.id === rawItem.ingredient)
        }
      }),
      steps: rawData.steps.map((rawStep) => StepMapper.toModel(rawStep)),
      equipment: [],
      source: ''
    };
  }
}
