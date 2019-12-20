import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { AppState } from '../../../store/app.state';
import { Recipe } from '../../../interfaces/recipe/recipe.interface';
import { NavigateAction, SetRecipeSearchFilterValue } from '../../../store/app.actions';
import { RecipeFilters } from '../../../interfaces/filters/recipe-filters.interface';

@Component({
    selector: 'app-overview',
    templateUrl: './overview.component.html',
    styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
    recipes: Recipe[];
    filteredRecipes: Recipe[] = [];
    searchValue: string;
    recipeFilter: RecipeFilters;
    sidenavOpen = false;

    constructor(private store: Store) {
        this.searchValue = store.selectSnapshot(AppState.getRecipeFilters).search;

        store.select(AppState.getRecipes).subscribe((recipes) => {
            if (recipes) {
                this.recipes = [...recipes];
                this.updateFilteredRecipes();
            }
        });

        store.select(AppState.getRecipeFilters).subscribe((recipeFilters) => {
            this.recipeFilter = recipeFilters;
            this.updateFilteredRecipes();
        });
    }

    private updateFilteredRecipes() {
        let filteredRecipes = this.recipes;
        if (this.recipeFilter) {
            if (this.recipeFilter.search && this.recipeFilter.search !== '') {
                filteredRecipes = filteredRecipes.filter((recipe) => {
                    return recipe.name.indexOf(this.recipeFilter.search) !== -1;
                });
            }
            if (this.recipeFilter.ingredients && this.recipeFilter.ingredients.length > 0) {
                filteredRecipes = filteredRecipes.filter((recipe) => {
                    const ingredientIds = recipe.items.map((item) => item.ingredient.id);
                    const filteredIngredientIds = this.recipeFilter.ingredients.map((ingredient) => ingredient.id);
                    return ingredientIds.some(r => filteredIngredientIds.indexOf(r) >= 0);
                });
            }

            this.filteredRecipes = filteredRecipes;
        }
        if (this.filteredRecipes) {
            this.filteredRecipes.sort((a: Recipe, b: Recipe) => {
                return b.creationDate.getTime() - a.creationDate.getTime();
            });
        }
    }

    ngOnInit() {
    }

    createRecipe() {
        this.store.dispatch(new NavigateAction(['recipe', 'create']));
    }

    toggleSidebar() {
        this.sidenavOpen = !this.sidenavOpen;
    }

    updateSearchValue() {
        this.store.dispatch(new SetRecipeSearchFilterValue(this.searchValue));
    }
}
