import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { RecipeListUtil } from '../../../utils/recipe-list.util';
import { AppState } from '../../../store/app.state';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from '../../../interfaces/recipe/recipe.interface';
import { MatDialog } from '@angular/material';
import { ConfirmationComponent } from '../../shared/confirmation/confirmation.component';
import { Message } from "../../../../messagebar/interfaces/messagebar/message.interface";
import {
    DeleteRecipeAction,
    NavigateAction,
    ShareRecipeAction
} from '../../../store/app.actions';

import {ShareComponent} from "../../shared/share/share.component";
import {MessagebarService} from "../../../../messagebar/services/messagebar.service";

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
        public dialog: MatDialog,
        private messagebarService: MessagebarService
    ) {}

    ngOnInit() {
        this.route.paramMap.subscribe((params) => {
            this.store.select(AppState.getRecipes).subscribe((recipes) => {
                this.recipes = recipes;
                const recipeId = params.get('recipeId');
                this.recipe = RecipeListUtil.findRecipeById(this.recipes, recipeId);
            });
        });
    }

    editRecipe(recipe: Recipe) {
        this.store.dispatch(new NavigateAction(['recipe', 'edit', this.recipe.id]));
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

    shareRecipe() {
        const dialogRef = this.dialog.open(ShareComponent, {
            width: '400px',
            data: {
                userId: this.recipe.userId
            }
        });

        dialogRef.afterClosed().subscribe(sharedUser => {
            if (sharedUser) {
                this.store.dispatch(new ShareRecipeAction(this.recipe, sharedUser));

                let successMessage: Message = { message: 'Shared recipe with ' + sharedUser.username };
                this.messagebarService.addMessage(successMessage);
            }
        });
    }
}
