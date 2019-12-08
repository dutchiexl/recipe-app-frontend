import { Recipe } from '../interfaces/recipe/recipe.interface';
import { RawRecipe } from '../interfaces/api/raw-recipe.interface';
import { RawItem } from '../interfaces/api/raw-item.interface';

export class RecipeUtil {
  public static createEmpty(): Recipe {
    return {
      name: null,
      nameAddition: null,
      imagePath: null,
      description: null,
      creationDate: null,
      steps: [],
      items: [],
      equipment: [],
      source: null
    }
  }

  static recipeAsJSON(recipe: Recipe): RawRecipe {
    return {
      name: recipe.name,
      nameAddition: recipe.nameAddition,
      description: recipe.description,
      steps: recipe.steps.map((step) => {
        let recipeStep = {
          name: step.name,
          text: step.text,
          imagePath: step.imagePath
        };

        if (step.imagePath) {
          recipeStep.imagePath = step.imagePath;
        }

        return step;
      }),
      items: recipe.items.map((item) => {
        let rawItem: RawItem = {
          amount: item.amount,
          unit: item.unit.id,
          ingredient: item.ingredient.id
        };
        return rawItem;
      }),
      imagePath: recipe.imagePath,
      creationDate: new Date(),
      equipment: [],
      nutrients: []
    };
  }

  static recipeListAsJson(recipes: Recipe[]) {
    return {
      'recipes': recipes.map((recipe) => recipe.id)
    }
  }
}
