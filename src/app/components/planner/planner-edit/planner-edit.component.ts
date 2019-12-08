import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MealPlan } from '../../../interfaces/planner/meal-plan';
import { Store } from '@ngxs/store';
import { HttpClient } from '@angular/common/http';
import { MealPlanUtil } from '../../../utils/mealPlanUtil';
import { Recipe } from '../../../interfaces/recipe/recipe.interface';
import { RecipeState } from '../../../store/recipe.state';
import { UpdateOrCreateMealPlanAction } from '../../../store/recipe.actions';
import { Navigate } from '@ngxs/router-plugin';
import { MealPlanListUtil } from '../../../utils/meal-plan-list.util';
import { ActivatedRoute } from '@angular/router';
import { RecipeUtil } from '../../../utils/recipe.util';

@Component({
  selector: 'app-planner-edit',
  templateUrl: './planner-edit.component.html',
  styleUrls: ['./planner-edit.component.scss']
})
export class PlannerEditComponent implements OnInit {
  recipes: Recipe[];
  filteredRecipes: Recipe[];
  mealPlan: MealPlan;
  mealPlanRecipes: Recipe[] = [];
  form: FormGroup;

  constructor(
    private store: Store,
    private http: HttpClient,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    this.mealPlan = MealPlanUtil.createEmpty();
    store.select(RecipeState.getRecipes).subscribe((recipes) => {
      this.recipes = recipes;
      this.filterRecipes();
    });
  }

  ngOnInit() {
    let mealPlanIdParameter = this.route.snapshot.paramMap.get('mealPlanId');

    if (mealPlanIdParameter) {
      const mealPlanId = mealPlanIdParameter;
      this.mealPlan = MealPlanListUtil.findById(this.store.selectSnapshot(RecipeState.getMealPlans), mealPlanId);
      this.mealPlanRecipes = this.mealPlan.recipes.map((recipe) => recipe)
    } else {
      this.mealPlan = MealPlanUtil.createEmpty();
    }
    this.filterRecipes();
    this.form = this.formBuilder.group({
      name: [this.mealPlan.name, Validators.required],
    });
  }

  submitForm() {
    if (this.form.valid) {
      let mealPlanToSubmit = MealPlanUtil.createEmpty();
      mealPlanToSubmit.name = this.form.get('name').value;
      mealPlanToSubmit.recipes = this.mealPlanRecipes;

      if (this.mealPlan.id) {
        mealPlanToSubmit.id = this.mealPlan.id;
      }
      
      this.store.dispatch(new UpdateOrCreateMealPlanAction(mealPlanToSubmit));
    }
  }

  addRecipeToMealPlan(recipe: Recipe) {
    if (!this.mealPlan.recipes.find((planRecipe) => planRecipe === recipe)) {
      this.mealPlanRecipes.push(recipe);
    }

    this.filterRecipes();
  }


  removeRecipeFromMealPlan(recipe: Recipe) {
    this.mealPlanRecipes = this.mealPlanRecipes.filter((planRecipe) => planRecipe !== recipe);

    this.filterRecipes();
  }

  private filterRecipes() {
    this.filteredRecipes = this.recipes.filter((planRecipe) =>
      !this.mealPlanRecipes.find((r) => r.id === planRecipe.id)
    );
  }
}
