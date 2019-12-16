import { Recipe } from '../interfaces/recipe/recipe.interface';
import { RawRecipe } from '../interfaces/api/raw-recipe.interface';
import { RawItem } from '../interfaces/api/raw-item.interface';
import { RawRecipeCategory } from '../interfaces/api/raw-recipe-category.interface';

export class RecipeUtil {
    public static createEmpty(): Recipe {
        return {
            name: null,
            nameAddition: null,
            imagePath: null,
            description: null,
            serves: null,
            creationDate: null,
            steps: [],
            items: [],
            equipment: [],
            categories: [],
            source: null
        };
    }

    static recipeAsJSON(recipe: Recipe): RawRecipe {
        return {
            name: recipe.name,
            nameAddition: recipe.nameAddition,
            description: recipe.description,
            serves: recipe.serves,
            steps: recipe.steps.map((step) => {
                const recipeStep = {
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
                const rawItem: RawItem = {
                    amount: item.amount,
                    unit: item.unit.id,
                    ingredient: item.ingredient.id
                };
                return rawItem;
            }),
            categories: recipe.categories.map((item) => {
                const rawCategory: RawRecipeCategory = {
                    _id: item.id,
                    name: item.name
                };
                return rawCategory;
            }),
            imagePath: recipe.imagePath,
            equipment: [],
            nutrients: []
        };
    }

    static recipeListAsJson(recipes: Recipe[]) {
        return {
            'recipes': recipes.map((recipe) => recipe.id)
        };
    }
}
