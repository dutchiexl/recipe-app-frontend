import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { AppState } from '../../../store/app.state';
import { Recipe } from '../../../interfaces/recipe/recipe.interface';
import { NavigateAction } from '../../../store/app.actions';

@Component({
    selector: 'app-overview',
    templateUrl: './overview.component.html',
    styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
    recipes: Recipe[];

    constructor(private store: Store) {
        store.select(AppState.getRecipes).subscribe((recipes) => {
            this.recipes = [...recipes];
            this.recipes.sort((a: Recipe, b: Recipe) => {
                return b.creationDate.getTime() - a.creationDate.getTime();
            });
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
}
