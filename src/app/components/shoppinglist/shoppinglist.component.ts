import { Component, OnInit } from '@angular/core';
import { MealPlan } from '../../interfaces/planner/meal-plan';
import { Store } from '@ngxs/store';
import { ActivatedRoute } from '@angular/router';
import { MealPlanListUtil } from '../../utils/meal-plan-list.util';
import { RecipeState } from '../../store/recipe.state';
import { Shoppinglist } from '../../interfaces/shoppinglist/shoppinglist';
import { ShoppingListUtil } from '../../utils/shopping-list-util';
import { Unit } from '../../interfaces/unit/unit';

@Component({
  selector: 'app-shoppinglist',
  templateUrl: './shoppinglist.component.html',
  styleUrls: ['./shoppinglist.component.scss']
})
export class ShoppinglistComponent implements OnInit {
  mealPlan: MealPlan;
  shoppingList: Shoppinglist;
  units: Unit[];
  loaded = false;

  constructor(
    private store: Store,
    private route: ActivatedRoute
  ) {
    const mealPlanId = this.route.snapshot.paramMap.get('planId');
    this.mealPlan = MealPlanListUtil.findById(this.store.selectSnapshot(RecipeState.getMealPlans), mealPlanId);
    this.store.select(RecipeState.getUnits).subscribe((units) => {
      this.units = units;
      this.loadShoppingList();
    });
    if (this.loaded) {
      this.loadShoppingList();
    }
  }

  ngOnInit() {

  }

  private loadShoppingList() {
    this.shoppingList = ShoppingListUtil.convertMealplanToShoppingList(this.mealPlan, this.units);
    this.loaded = true;
  }
}
