import { Component, OnInit } from '@angular/core';
import { MealPlan } from '../../../interfaces/planner/meal-plan';
import { Store } from '@ngxs/store';
import { ActivatedRoute } from '@angular/router';
import { AppState } from '../../../store/app.state';
import { MealPlanListUtil } from '../../../utils/meal-plan-list.util';
import { Recipe } from '../../../interfaces/recipe/recipe.interface';
import { MatDialog } from '@angular/material';
import { ConfirmationComponent } from '../../shared/confirmation/confirmation.component';
import {ArchiveMealPlanAction, DeleteMealPlanAction, NavigateAction} from '../../../store/app.actions';

@Component({
    selector: 'app-planner-detail',
    templateUrl: './planner-detail.component.html',
    styleUrls: ['./planner-detail.component.scss']
})
export class PlannerDetailComponent implements OnInit {
    mealPlans: MealPlan[];
    mealPlan: MealPlan;

    constructor(
        private store: Store,
        private route: ActivatedRoute,
        public dialog: MatDialog
    ) {}

    ngOnInit() {
        this.route.paramMap.subscribe((params) => {
            this.store.select(AppState.getMealPlans).subscribe((mealPlans) => {
                this.mealPlans = mealPlans;
                let mealPlanId = params.get('planId');
                this.mealPlan = MealPlanListUtil.findById(this.mealPlans, mealPlanId);
            });
        });
    }

    goToRecipe(recipe: Recipe) {
        this.store.dispatch(new NavigateAction(['recipe', recipe.id]));
    }

    editPlan() {
        this.store.dispatch(new NavigateAction(['plan', 'edit', this.mealPlan.id], this.mealPlan));
    }

    deletePlan() {
        const dialogRef = this.dialog.open(ConfirmationComponent, {
            width: '400px',
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.store.dispatch(new DeleteMealPlanAction(this.mealPlan));
            }
        });
    }

    archiveMealPlan(mealPlan: MealPlan) {
        this.store.dispatch(new ArchiveMealPlanAction(mealPlan, true));
    }

    unarchiveMealPlan(mealPlan: MealPlan) {
        this.store.dispatch(new ArchiveMealPlanAction(mealPlan, false));
    }
}
