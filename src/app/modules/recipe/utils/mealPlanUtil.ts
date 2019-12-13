import { MealPlan } from '../interfaces/planner/meal-plan';
import { RawMealPlan } from '../interfaces/api/raw-meal.plan';

export class MealPlanUtil {
    public static createEmpty(mealPlan?: MealPlan): MealPlan {
        if (mealPlan) {
            return Object.assign({}, mealPlan)
        }

        return {
            name: null,
            recipes: [],
            archived: undefined
        };
    }

    static asJson(mealPlan: MealPlan): RawMealPlan {
        return {
            name: mealPlan.name,
            recipes: mealPlan.recipes.map((recipe) => recipe.id),
            archived: mealPlan.archived
        };
    }
}
