import { Action, Selector, State, StateContext } from '@ngxs/store';
import {
    ArchiveMealPlanAction,
    CreateIngredientAction,
    DeleteMealPlanAction,
    DeleteRecipeAction,
    LoadApplicationAction,
    LoadIngredientCategoriesAction,
    LoadIngredientsAction,
    LoadMealPlansAction,
    LoadRecipeCategoriesAction,
    LoadRecipesAction,
    LoadUnitsAction,
    LoadSharedUsersAction,
    NavigateAction,
    SetMealplanAction,
    SetModeAction, ShareRecipeAction,
    SetRecipeIngredientFilterValue,
    SetRecipeSearchFilterValue,
    ShowArchivedMealPlansAction,
    UpdateOrCreateMealPlanAction,
    UpdateOrCreateRecipeAction
} from './app.actions';
import { Recipe } from '../interfaces/recipe/recipe.interface';
import produce from 'immer';
import { RecipeService } from '../services/recipe.service';
import { MealPlan } from '../interfaces/planner/meal-plan';
import { MealPlanService } from '../services/meal-plan.service';
import { Navigate } from '@ngxs/router-plugin';
import { RawRecipe } from '../interfaces/api/raw-recipe.interface';
import { RawMealPlan } from '../interfaces/api/raw-meal.plan';
import { AppModeEnum } from '../enums/app-mode.enum';
import { Unit } from '../interfaces/unit/unit';
import { IngredientCategoryService } from '../services/ingredient-category.service';
import { IngredientCategory } from '../interfaces/recipe/ingredient-category';
import { UnitService } from '../services/unit.service';
import { Ingredient } from '../interfaces/recipe/ingredient.interface';
import { IngredientService } from '../services/ingredient.service';
import { MealPlanUtil } from '../utils/mealPlanUtil';
import { RecipeFilters } from '../interfaces/filters/recipe-filters.interface';
import {SharedRecipesService} from "../services/shared-recipes.service";
import {SharedRecipesUtil} from "../utils/shared-recipes.util";
import {SharedRecipe} from "../interfaces/recipe/shared-recipe.interface";
import {SharedUserService} from "../services/shared-user.service";
import {SharedUser} from "../interfaces/user/shared-user.interface";
import { RecipeCategoryService } from '../services/recipe-category.service';
import { RecipeCategory } from '../interfaces/recipe/recipe-category';

export interface AppStateModel {
    mode: AppModeEnum;
    selectedMealplan: MealPlan;
    recipeFilters: RecipeFilters;
    showArchivedMealplans: boolean;
    isLoaded: boolean;
    recipes: Recipe[];
    mealPlans: MealPlan[];
    units: Unit[];
    ingredients: Ingredient[];
    ingredientCategories: IngredientCategory[];
    sharedUsers: SharedUser[];
    recipeCategories: RecipeCategory[];
}

@State<AppStateModel>({
    name: 'recipe',
    defaults: {
        mode: AppModeEnum.RECIPES,
        selectedMealplan: undefined,
        recipeFilters: {
            search: undefined,
            ingredients: []
        },
        showArchivedMealplans: false,
        isLoaded: false,
        recipes: undefined,
        mealPlans: undefined,
        units: undefined,
        ingredients: undefined,
        ingredientCategories: undefined,
        sharedUsers: undefined,
        recipeCategories: undefined
    }
})
export class AppState {

    constructor(
        private recipeService: RecipeService,
        private sharedRecipesService: SharedRecipesService,
        private mealPlanService: MealPlanService,
        private unitService: UnitService,
        private ingredientService: IngredientService,
        private ingredientCategoryService: IngredientCategoryService,
        private sharedUserService: SharedUserService,
        private recipeCategoryService: RecipeCategoryService
    ) {
    }

    @Selector()
    public static getState(state: AppStateModel) {
        return state;
    }

    @Selector()
    public static getMode(state: AppStateModel) {
        return state.mode;
    }

    @Selector()
    public static getLoadedState(state: AppStateModel) {
        return state.isLoaded;
    }

    @Selector()
    public static getRecipeFilters(state: AppStateModel): RecipeFilters {
        return state.recipeFilters;
    }

    @Selector()
    public static getRecipes(state: AppStateModel): Recipe[] {
        return state.recipes;
    }

    @Selector()
    public static getSelectedMealplan(state: AppStateModel): MealPlan {
        return state.selectedMealplan;
    }

    @Selector()
    public static getMealPlans(state: AppStateModel): MealPlan[] {
        return state.mealPlans;
    }

    @Selector()
    public static showArchivedMealPlans(state: AppStateModel): boolean {
        return state.showArchivedMealplans;
    }

    @Selector()
    public static getUnits(state: AppStateModel): Unit[] {
        return state.units;
    }

    @Selector()
    public static getIngredients(state: AppStateModel): Ingredient[] {
        return state.ingredients;
    }

    @Selector()
    public static getIngredientCategories(state: AppStateModel): IngredientCategory[] {
        return state.ingredientCategories;
    }

    @Selector()
    public static getSharedUsers(state: AppStateModel): SharedUser[] {
        return state.sharedUsers;
    }
  
    @Selector()
    public static getRecipeCategories(state: AppStateModel): RecipeCategory[] {
        return state.recipeCategories;
    }

    @Action(SetModeAction)
    public setMode(ctx: StateContext<AppStateModel>, action: SetModeAction) {
        ctx.setState(
            produce(ctx.getState(), (draft) => {
                draft.mode = action.mode;
            }),
        );
        switch (action.mode) {
            case AppModeEnum.RECIPES:
                ctx.dispatch(new NavigateAction(['']));
                break;
            case AppModeEnum.MEALPLANS:
                ctx.dispatch(new NavigateAction(['plan']));
                break;
            case AppModeEnum.MANAGE_UNITS:
                ctx.dispatch(new NavigateAction(['manage', 'units']));
                break;
        }
    }

    @Action(LoadApplicationAction)
    public loadAPI(ctx: StateContext<AppStateModel>, action: LoadApplicationAction) {
        this.setLoadedState(ctx, false);
        if (action.isAuthenticated) {
            ctx.dispatch(new LoadRecipesAction());
            ctx.dispatch(new LoadMealPlansAction());
            ctx.dispatch(new LoadUnitsAction());
            ctx.dispatch(new LoadSharedUsersAction());
            ctx.dispatch(new LoadIngredientCategoriesAction());
            ctx.dispatch(new LoadRecipeCategoriesAction());
            ctx.dispatch(new LoadIngredientsAction());
        } else {
            this.setLoadedState(ctx, true);
        }
    }

    @Action(LoadRecipesAction)
    public loadRecipes(ctx: StateContext<AppStateModel>, {}: LoadRecipesAction) {
        this.setLoadedState(ctx, false);
        this.recipeService.getRecipes().subscribe((recipes) => {
            ctx.setState(
                produce(ctx.getState(), (draft) => {
                    draft.recipes = recipes;
                }),
            );
            this.checkLoadedState(ctx);
        });
    }

    @Action(LoadMealPlansAction)
    public loadMealPlans(ctx: StateContext<AppStateModel>, {}: LoadMealPlansAction) {
        this.setLoadedState(ctx, false);
        this.mealPlanService.getAll().subscribe((mealPlans) => {
            ctx.setState(
                produce(ctx.getState(), (draft) => {
                    draft.mealPlans = mealPlans;
                }),
            );
            this.checkLoadedState(ctx);
        });
    }

    @Action(ArchiveMealPlanAction)
    public archiveMealPlan(ctx: StateContext<AppStateModel>, action: ArchiveMealPlanAction) {
        const manipulatedMealPlan: MealPlan = MealPlanUtil.createEmpty(action.mealPlan);
        manipulatedMealPlan.archived = action.archive;

        this.mealPlanService.update(manipulatedMealPlan).subscribe(() => {
            ctx.dispatch(new LoadMealPlansAction());
            ctx.dispatch(new NavigateAction(['plan']));
        });
    }

    @Action(SetRecipeSearchFilterValue)
    public setRecipeSearchFilterValue(ctx: StateContext<AppStateModel>, action: SetRecipeSearchFilterValue) {
        ctx.setState(
            produce(ctx.getState(), (draft) => {
                draft.recipeFilters.search = action.searchValue;
            }),
        );
    }

    @Action(SetRecipeIngredientFilterValue)
    public setRecipeIngredientFilterValue(ctx: StateContext<AppStateModel>, action: SetRecipeIngredientFilterValue) {
        ctx.setState(
            produce(ctx.getState(), (draft) => {
                draft.recipeFilters.ingredients = action.ingredients;
            }),
        );
    }

    @Action(ShowArchivedMealPlansAction)
    public showArchivedMealPlans(ctx: StateContext<AppStateModel>, action: ShowArchivedMealPlansAction) {
        ctx.setState(
            produce(ctx.getState(), (draft) => {
                draft.showArchivedMealplans = action.show;
            }),
        );
    }

    @Action(LoadUnitsAction)
    public loadUnits(ctx: StateContext<AppStateModel>, {}: LoadUnitsAction) {
        this.setLoadedState(ctx, false);
        this.unitService.getAll().subscribe((units) => {
            ctx.setState(
                produce(ctx.getState(), (draft) => {
                    draft.units = units;
                }),
            );
            this.checkLoadedState(ctx);
        });
    }

    @Action(LoadSharedUsersAction)
    public loadSharedUsers(ctx: StateContext<AppStateModel>, {}: LoadSharedUsersAction) {
        this.setLoadedState(ctx, false);
        this.sharedUserService.getAll().subscribe((sharedUsers) => {
            ctx.setState(
                produce(ctx.getState(), (draft) => {
                    draft.sharedUsers = sharedUsers;
                }),
            );
            this.checkLoadedState(ctx);
        });
    }

    @Action(LoadIngredientsAction)
    public loadIngredients(ctx: StateContext<AppStateModel>, {}: LoadIngredientsAction) {
        this.setLoadedState(ctx, false);
        this.ingredientService.getAll().subscribe((ingredients) => {
            ctx.setState(
                produce(ctx.getState(), (draft) => {
                    draft.ingredients = ingredients;
                }),
            );
            this.checkLoadedState(ctx);
        });
    }

    @Action(LoadIngredientCategoriesAction)
    public loadIngredientCategories(ctx: StateContext<AppStateModel>, {}: LoadIngredientCategoriesAction) {
        this.setLoadedState(ctx, false);
        this.ingredientCategoryService.getAll().subscribe((ingredientCategories) => {
            ctx.setState(
                produce(ctx.getState(), (draft) => {
                    draft.ingredientCategories = ingredientCategories;
                }),
            );
            this.checkLoadedState(ctx);
        });
    }

    @Action(LoadRecipeCategoriesAction)
    public loadRecipeCategories(ctx: StateContext<AppStateModel>, {}: LoadRecipeCategoriesAction) {
        this.setLoadedState(ctx, false);
        this.recipeCategoryService.getAll().subscribe((recipeCategories) => {
            ctx.setState(
                produce(ctx.getState(), (draft) => {
                    draft.recipeCategories = recipeCategories;
                }),
            );
            this.checkLoadedState(ctx);
        });
    }

    @Action(UpdateOrCreateRecipeAction)
    public updateOrCreateRecipe(ctx: StateContext<AppStateModel>, action: UpdateOrCreateRecipeAction) {
        if (action.recipe.id) {
            this.recipeService.update(action.recipe).subscribe(() => {
                ctx.dispatch(new LoadRecipesAction());
                ctx.dispatch(new LoadMealPlansAction());
                ctx.dispatch(new NavigateAction(['recipe', action.recipe.id]));
            });
        } else {
            this.recipeService.create(action.recipe).subscribe((recipe: RawRecipe) => {
                ctx.dispatch(new LoadRecipesAction());
                ctx.dispatch(new LoadMealPlansAction());
                ctx.dispatch(new NavigateAction(['recipe', recipe._id]));
            });
        }
    }

    @Action(ShareRecipeAction)
    public shareRecipeAction(ctx: StateContext<AppStateModel>, action: ShareRecipeAction) {
        const sharedRecipe: SharedRecipe = SharedRecipesUtil.createShareObject(action.recipe, action.user);
        this.sharedRecipesService.shareRecipe(sharedRecipe).subscribe();
    }

    @Action(DeleteRecipeAction)
    public deleteRecipe(ctx: StateContext<AppStateModel>, action: DeleteRecipeAction) {
        ctx.getState().mealPlans.filter((plan) => {
            return plan.recipes.some((recipe) => {
                return recipe.id === action.recipe.id;
            });
        }).forEach((plan) => {
            const recipes = plan.recipes.filter((recipe) => {
                return recipe.id !== action.recipe.id;
            });
            this.mealPlanService.updateRecipes(plan, recipes).subscribe();
        });
        this.recipeService.delete(action.recipe).subscribe(() => {
            ctx.dispatch(new LoadRecipesAction());
            ctx.dispatch(new LoadMealPlansAction());
            ctx.dispatch(new NavigateAction(['']));
        });
    }

    @Action(UpdateOrCreateMealPlanAction)
    public updateOrCreateMealPlan(ctx: StateContext<AppStateModel>, action: UpdateOrCreateMealPlanAction) {
        if (action.mealPlan.id) {
            this.mealPlanService.update(action.mealPlan).subscribe(() => {
                ctx.dispatch(new LoadMealPlansAction());
                ctx.dispatch(new NavigateAction(['plan', action.mealPlan.id], action.mealPlan));
            });
        } else {
            this.mealPlanService.create(action.mealPlan).subscribe((mealPlan: RawMealPlan) => {
                ctx.dispatch(new LoadMealPlansAction());
                ctx.dispatch(new NavigateAction(['plan', mealPlan._id], action.mealPlan));
            });
        }
    }

    @Action(SetMealplanAction)
    public setMealPlan(ctx: StateContext<AppStateModel>, action: SetMealplanAction) {
        ctx.setState(
            produce(ctx.getState(), (draft) => {
                draft.selectedMealplan = action.mealPlan;
            }),
        );
        ctx.dispatch(new NavigateAction(['plan', action.mealPlan.id]));
    }

    @Action(CreateIngredientAction)
    public createIngredient(ctx: StateContext<AppStateModel>, action: CreateIngredientAction) {
        return this.ingredientService.create(action.ingredient).subscribe((ingredient) => {
            ctx.setState(
                produce(ctx.getState(), (draft) => {
                    draft.ingredients = [...draft.ingredients, ingredient];
                }),
            );
        });
    }

    @Action(DeleteMealPlanAction)
    public deleteMealplan(ctx: StateContext<AppStateModel>, action: DeleteMealPlanAction) {
        this.mealPlanService.delete(action.mealPlan).subscribe(() => {
            ctx.dispatch(new LoadMealPlansAction());
            ctx.dispatch(new NavigateAction(['plan']));
        });
    }

    @Action(NavigateAction)
    public navigate(ctx: StateContext<AppStateModel>, action: NavigateAction) {
        if (action.mealplan) {
            ctx.setState(
                produce(ctx.getState(), (draft) => {
                    draft.selectedMealplan = action.mealplan;
                }),
            );
        } else {
            ctx.setState(
                produce(ctx.getState(), (draft) => {
                    draft.selectedMealplan = undefined;
                }),
            );
        }
        ctx.dispatch(new Navigate(action.path));
    }

    private checkLoadedState(ctx: StateContext<AppStateModel>): void {
        if (ctx.getState().recipes && ctx.getState().mealPlans) {
            this.setLoadedState(ctx, true);
        }
    }

    private setLoadedState(ctx: StateContext<AppStateModel>, state: boolean) {
        ctx.setState(
            produce(ctx.getState(), (draft) => {
                draft.isLoaded = state;
            }),
        );
    }
}
