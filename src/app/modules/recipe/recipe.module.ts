import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverviewItemComponent } from './components/recipe/overview/overview-item/overview-item.component';
import { OverviewComponent } from './components/recipe/overview/overview.component';
import { DetailComponent } from './components/recipe/detail/detail.component';
import { StepComponent } from './components/recipe/step/step.component';
import { EditComponent } from './components/recipe/edit/edit.component';
import { EditItemComponent } from './components/recipe/item/edit/edit.component';
import { EditStepComponent } from './components/recipe/step/edit/edit.component';
import { PlannerOverviewComponent } from './components/planner/planner-overview/planner-overview.component';
import { PlannerOverviewItemComponent } from './components/planner/planner-overview/planner-overview-item/planner-overview-item.component';
import { PlannerDetailComponent } from './components/planner/planner-detail/planner-detail.component';
import { PlannerEditComponent } from './components/planner/planner-edit/planner-edit.component';
import { RecipeListItemComponent } from './components/recipe/recipe-list-item/recipe-list-item.component';
import { ConfirmationComponent } from './components/shared/confirmation/confirmation.component';
import { ShoppinglistComponent } from './components/shoppinglist/shoppinglist.component';
import { ShoppinglistGroupComponent } from './components/shoppinglist/shoppinglist-group/shoppinglist-group.component';
import { UnitsComponent } from './components/settings/units/units.component';
import { ItemComponent } from './components/recipe/item/item.component';
import { CreateIngredientComponent } from './components/recipe/ingredient/create/create.component';
import { AssetPipe } from './pipes/asset.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '../../core/material/material.module';
import { RecipeService } from './services/recipe.service';
import { MealPlanService } from './services/meal-plan.service';
import { UnitService } from './services/unit.service';
import { SharedUserService } from './services/shared-user.service';
import { IngredientService } from './services/ingredient.service';
import { IngredientCategoryService } from './services/ingredient-category.service';
import { IngredientsFilterComponent } from './components/recipe/overview/filters/ingredients/ingredients-filter.component';
import {ShareComponent} from "./components/shared/share/share.component";
import {SharedRecipesService} from "./services/shared-recipes.service";
import { RecipeCategoryService } from './services/recipe-category.service';
import { RecipeCategoryPickerComponent } from './components/recipe/edit/categories/recipe-category-picker.component';

@NgModule({
    declarations: [
        OverviewItemComponent,
        OverviewComponent,
        DetailComponent,
        StepComponent,
        EditComponent,
        EditItemComponent,
        EditStepComponent,
        PlannerOverviewComponent,
        PlannerOverviewItemComponent,
        PlannerDetailComponent,
        PlannerEditComponent,
        RecipeListItemComponent,
        ConfirmationComponent,
        ShoppinglistComponent,
        ShoppinglistGroupComponent,
        UnitsComponent,
        ItemComponent,
        CreateIngredientComponent,
        AssetPipe,
        IngredientsFilterComponent,
        RecipeCategoryPickerComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        HttpClientModule
    ],
    providers: [
        RecipeService,
        SharedRecipesService,
        MealPlanService,
        UnitService,
        SharedUserService,
        IngredientService,
        IngredientCategoryService,
        RecipeCategoryService
    ],
    entryComponents: [
        ConfirmationComponent,
        ShareComponent,
        CreateIngredientComponent
    ]
})
export class RecipeModule {
}
