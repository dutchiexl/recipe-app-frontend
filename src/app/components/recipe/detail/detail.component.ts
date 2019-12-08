import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { RecipeListUtil } from '../../../utils/recipe-list.util';
import { RecipeState } from '../../../store/recipe.state';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from '../../../interfaces/recipe/recipe.interface';
import { MatDialog } from '@angular/material';
import { ConfirmationComponent } from '../../shared/confirmation/confirmation.component';
import { DeleteRecipeAction, NavigateAction } from '../../../store/recipe.actions';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  recipes: Recipe[];
  recipe: Recipe;

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.store.select(RecipeState.getRecipes).subscribe((recipes) => {
        this.recipes = recipes;
        let recipeId = params.get('recipeId');
        this.recipe = RecipeListUtil.findRecipeById(this.recipes, recipeId);
      });
    });
  }

  editRecipe(recipe: Recipe) {
    this.store.dispatch(new NavigateAction(['recipe', 'edit', this.recipe.id]))
  }

  delete() {
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.store.dispatch(new DeleteRecipeAction(this.recipe));
      }
    });
  }
}
