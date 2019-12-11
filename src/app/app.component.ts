import { Component } from '@angular/core';
import { Actions, ofActionDispatched, Store } from '@ngxs/store';
import { AppState } from './modules/recipe/store/app.state';
import { AppModeEnum } from './modules/recipe/enums/app-mode.enum';
import { NavigateAction, SetModeAction } from './modules/recipe/store/app.actions';
import { MealPlan } from './modules/recipe/interfaces/planner/meal-plan';
import { LogoutAction } from './core/authentication/store/auth.actions';

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

    constructor(
        private store: Store,
        private actions: Actions
    ) {
        store.select(AppState.getMode).subscribe((mode) => {
            this.mode = mode;
        });
        store.select(AppState.getLoadedState).subscribe((state) => {
            this.isLoaded = state;
        });
        store.select(AppState.getSelectedMealplan).subscribe((mealplan) => {
            this.selectedMealPlan = mealplan;
        });
        this.actions.pipe(ofActionDispatched(LogoutAction))
            .subscribe(() => this.store.dispatch(new NavigateAction(['login'])));

    }

    setMode(mode: AppModeEnum) {
        this.store.dispatch(new SetModeAction(mode));
    }

    goToShoppingList() {
        this.store.dispatch(new NavigateAction(['plan', this.selectedMealPlan.id, 'shoppinglist'], this.selectedMealPlan));
    }

    goToOverview() {
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
