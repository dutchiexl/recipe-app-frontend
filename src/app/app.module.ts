import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatDividerModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule, MatSelectModule,
  MatToolbarModule
} from '@angular/material';
import { OverviewComponent } from './components/recipe/overview/overview.component';
import { DetailComponent } from './components/recipe/detail/detail.component';
import { OverviewItemComponent } from './components/recipe/overview/overview-item/overview-item.component';
import { NgxsModule, Store } from '@ngxs/store';
import { RecipeState } from './store/recipe.state';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { StepComponent } from './components/recipe/step/step.component';
import { LoadApplicationAction } from './store/recipe.actions';
import { RecipeService } from './services/recipe.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditComponent } from './components/recipe/edit/edit.component';
import { EditStepComponent } from './components/recipe/step/edit/edit.component';
import { EcoFabSpeedDialModule } from '@ecodev/fab-speed-dial';
import { PlannerOverviewComponent } from './components/planner/planner-overview/planner-overview.component';
import { PlannerOverviewItemComponent } from './components/planner/planner-overview/planner-overview-item/planner-overview-item.component';
import { PlannerDetailComponent } from './components/planner/planner-detail/planner-detail.component';
import { MealPlanService } from './services/meal-plan.service';
import { PlannerEditComponent } from './components/planner/planner-edit/planner-edit.component';
import { RecipeListItemComponent } from './components/recipe/recipe-list-item/recipe-list-item.component';
import { ConfirmationComponent } from './components/shared/confirmation/confirmation.component';
import { ShoppinglistComponent } from './components/shoppinglist/shoppinglist.component';
import { ShoppinglistGroupComponent } from './components/shoppinglist/shoppinglist-group/shoppinglist-group.component';
import { UnitsComponent } from './components/settings/units/units.component';
import { UnitService } from './services/unit.service';
import { IngredientCategoryService } from './services/ingredient-category.service';
import { ItemComponent } from './components/recipe/item/item.component';
import { EditItemComponent } from './components/recipe/item/edit/edit.component';
import { IngredientService } from './services/ingredient.service';
import { CreateIngredientComponent } from './components/recipe/ingredient/create/create.component';

@NgModule({
  declarations: [
    AppComponent,
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
    CreateIngredientComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatToolbarModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatListModule,
    MatDialogModule,
    MatMenuModule,
    MatAutocompleteModule,
    MatSelectModule,
    EcoFabSpeedDialModule,
    NgxsModule.forRoot([
      RecipeState
    ]),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsRouterPluginModule.forRoot()
  ],
  providers: [
    RecipeService,
    MealPlanService,
    UnitService,
    IngredientService,
    IngredientCategoryService
  ],
  entryComponents: [
    ConfirmationComponent,
    CreateIngredientComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(private store: Store) {
    store.dispatch(new LoadApplicationAction());
  }
}
