import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { RecipeState } from '../../../store/recipe.state';
import { Recipe } from '../../../interfaces/recipe/recipe.interface';
import { Navigate } from '@ngxs/router-plugin';
import { NavigateAction } from '../../../store/recipe.actions';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  recipes: Recipe[];

  constructor(private store: Store) {
    store.select(RecipeState.getRecipes).subscribe((recipes) => {
      this.recipes = recipes;
    });
  }

  ngOnInit() {
  }

  goToRecipe(recipe: Recipe) {
    this.store.dispatch(new NavigateAction(['recipe', recipe.id]))
  }

  createRecipe() {
    this.store.dispatch(new NavigateAction(['recipe', 'create']))
  }
}
