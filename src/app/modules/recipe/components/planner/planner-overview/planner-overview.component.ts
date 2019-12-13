import { Component, OnInit } from '@angular/core';
import { MealPlan } from '../../../interfaces/planner/meal-plan';
import { Store } from '@ngxs/store';
import { AppState } from '../../../store/app.state';
import { Recipe } from '../../../interfaces/recipe/recipe.interface';
import {NavigateAction, showArchivedMealPlansAction} from '../../../store/app.actions';

@Component({
    selector: 'app-planner-overview',
    templateUrl: './planner-overview.component.html',
    styleUrls: ['./planner-overview.component.scss']
})
export class PlannerOverviewComponent implements OnInit {
    mealPlans: MealPlan[];
    filteredMealPlans: MealPlan[];
    recipes: Recipe[];
    toggleArchivedMealPlans: boolean = false;

    constructor(private store: Store) {
        store.select(AppState.getMealPlans).subscribe((mealPlans) => {
            this.mealPlans = mealPlans;
            this.updateMealPlans();
        });

        store.select(AppState.showArchivedMealPlans).subscribe((showArchivedMealPlans) => {
            this.toggleArchivedMealPlans = showArchivedMealPlans;
            this.updateMealPlans();
        });
    }

    ngOnInit() {
    }

    updateMealPlans() {
        if (!this.toggleArchivedMealPlans) {
            this.filteredMealPlans = this.mealPlans.filter((mealPlan: MealPlan) => {
                    return !mealPlan.archived
                }
            );
        } else {
            this.filteredMealPlans = this.mealPlans
        }
    }

    createPlan() {
        this.store.dispatch(new NavigateAction(['plan', 'create']));
    }

    goToMealPlan(mealPlan: MealPlan) {
        this.store.dispatch(new NavigateAction(['plan', mealPlan.id], mealPlan));
    }

    showArchived() {
        this.store.dispatch(new showArchivedMealPlansAction(!this.toggleArchivedMealPlans));
    }
}
