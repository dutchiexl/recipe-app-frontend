import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { AppState } from './recipe/store/app.state';
import { AppModeEnum } from './recipe/enums/app-mode.enum';
import { NavigateAction, SetModeAction } from './recipe/store/app.actions';
import { MealPlan } from './recipe/interfaces/planner/meal-plan';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    stateEnum = AppModeEnum;
    selectedMealPlan: MealPlan;
    mode: AppModeEnum;
    isLoaded = false;

    constructor(private store: Store) {
        store.select(AppState.getMode).subscribe((mode) => {
            this.mode = mode;
        });
        store.select(AppState.getLoadedState).subscribe((state) => {
            this.isLoaded = state;
        });
        store.select(AppState.getSelectedMealplan).subscribe((mealplan) => {
            this.selectedMealPlan = mealplan;
        });
    }

    setMode(mode: AppModeEnum) {
        this.store.dispatch(new SetModeAction(mode));
    }

    goToShoppingList() {
        this.store.dispatch(new NavigateAction(['plan', this.selectedMealPlan.id, 'shoppinglist'], this.selectedMealPlan));
    }

    goToOverview() {
        console.log(this.mode);
        switch (this.mode) {
            case AppModeEnum.RECIPES:
                this.store.dispatch(new NavigateAction(['']));
                break;
            case AppModeEnum.MEALPLANS:
                this.store.dispatch(new NavigateAction(['plan']));
                break;
        }
    }
}
