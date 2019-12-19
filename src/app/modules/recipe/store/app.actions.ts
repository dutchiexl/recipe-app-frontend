import { Recipe } from '../interfaces/recipe/recipe.interface';
import { MealPlan } from '../interfaces/planner/meal-plan';
import { AppModeEnum } from '../enums/app-mode.enum';
import { Ingredient } from '../interfaces/recipe/ingredient.interface';

export class SetModeAction {
    public static readonly type = '[Recipe] Set the application mode';

    constructor(public mode: AppModeEnum) { }
}

export class LoadApplicationAction {
    public static readonly type = '[Recipe] Load Application';

    constructor(public isAuthenticated: boolean = true) { }
}

export class LoadRecipesAction {
    public static readonly type = '[Recipe] Load recipes';

    constructor() { }
}

export class LoadMealPlansAction {
    public static readonly type = '[Recipe] Load meal plans';

    constructor() { }
}

export class ArchiveMealPlanAction {
    public static readonly type = '[Recipe] Archive meal plan';

    constructor(public mealPlan: MealPlan, public archive: boolean) { }
}

export class SetRecipeSearchFilterValue{
    public static readonly type = '[Recipe] Set recipe search filter value';

    constructor(public searchValue: string) { }
}

export class SetRecipeIngredientFilterValue{
    public static readonly type = '[Recipe] Set recipe ingredient filter value';

    constructor(public ingredients: Ingredient[]) { }
}

export class ShowArchivedMealPlansAction {
    public static readonly type = '[Recipe] show/hide archived meal plans';

    constructor(public show: boolean) { }
}

export class LoadUnitsAction {
    public static readonly type = '[Recipe] Load units';

    constructor() { }
}

export class LoadSharedUsersAction {
    public static readonly type = '[Recipe] Load users';

    constructor() { }
}

export class LoadIngredientsAction {
    public static readonly type = '[Recipe] Load ingredients';

    constructor() { }
}

export class LoadIngredientCategoriesAction {
    public static readonly type = '[Recipe] Load ingredient categories';

    constructor() { }
}

export class LoadRecipeCategoriesAction {
    public static readonly type = '[Recipe] Load recipe categories';

    constructor() { }
}

export class UpdateOrCreateRecipeAction {
    public static readonly type = '[Recipe] Update or create a recipe';

    constructor(public recipe: Recipe) { }
}

export class DeleteRecipeAction {
    public static readonly type = '[Recipe] Delete a recipe';

    constructor(public recipe: Recipe) { }
}

export class ShareRecipeAction {
    public static readonly type = '[Recipe] share a recipe';

    constructor(public recipeId: string, public userId: string) { }
}

export class SetMealplanAction {
    public static readonly type = '[Recipe] Set a mealplan';

    constructor(public mealPlan?: MealPlan) { }
}

export class CreateIngredientAction {
    public static readonly type = '[Recipe] create ingredient';

    constructor(public ingredient: Ingredient) { }
}

export class UpdateOrCreateMealPlanAction {
    public static readonly type = '[Recipe] Update or create a mealplan';

    constructor(public mealPlan: MealPlan) { }
}

export class DeleteMealPlanAction {
    public static readonly type = '[Recipe] Delete a mealplan';

    constructor(public mealPlan: MealPlan) { }
}

export class NavigateAction {
    public static readonly type = '[Recipe] Navigate';

    constructor(public path: any[], public mealplan?: MealPlan) { }
}
