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
    filteredRecipes: Recipe[];
    searchValue: string;
    recipeFilter: RecipeFilters;
    sidenavOpen = false;

    constructor(private store: Store) {
        this.searchValue = store.selectSnapshot(AppState.getRecipeFilters).search;

        store.select(AppState.getRecipes).subscribe((recipes) => {
            this.recipes = [...recipes];
            this.updateFilteredRecipes();
        });

        store.select(AppState.getRecipeFilters).subscribe((recipeFilters) => {
            this.recipeFilter = recipeFilters;
            this.updateFilteredRecipes();
        });
    }

    private updateFilteredRecipes() {
        if (this.recipeFilter.search && this.recipeFilter.search !== '') {
            this.filteredRecipes = this.recipes.filter((recipe) => {
                return recipe.name.indexOf(this.recipeFilter.search) !== -1;
            });
        } else {
            this.filteredRecipes = this.recipes;
        }
        this.filteredRecipes.sort((a: Recipe, b: Recipe) => {
            return b.creationDate.getTime() - a.creationDate.getTime();
        });
    }

    ngOnInit() {
    }

    goToRecipe(recipe: Recipe) {
        this.store.dispatch(new NavigateAction(['recipe', recipe.id]));
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
