import { Component, OnInit } from '@angular/core';
import { MealPlan } from '../../../interfaces/planner/meal-plan';
import { Store } from '@ngxs/store';
import { AppState } from '../../../store/app.state';
import { Recipe } from '../../../interfaces/recipe/recipe.interface';
import { NavigateAction } from '../../../store/app.actions';

@Component({
    selector: 'app-planner-overview',
    templateUrl: './planner-overview.component.html',
    styleUrls: ['./planner-overview.component.scss']
})
export class PlannerOverviewComponent implements OnInit {
    mealPlans: MealPlan[];
    recipes: Recipe[];

    constructor(private store: Store) {
        store.select(AppState.getMealPlans).subscribe((mealPlans) => {
            this.mealPlans = mealPlans;
        });
    }

    ngOnInit() {
    }

    createPlan() {
        this.store.dispatch(new NavigateAction(['plan', 'create']));
    }

    goToMealPlan(mealPlan: MealPlan) {
        this.store.dispatch(new NavigateAction(['plan', mealPlan.id], mealPlan));
    }
}
