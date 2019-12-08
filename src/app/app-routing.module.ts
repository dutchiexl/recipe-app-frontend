import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OverviewComponent } from './components/recipe/overview/overview.component';
import { DetailComponent } from './components/recipe/detail/detail.component';
import { EditComponent } from './components/recipe/edit/edit.component';
import { PlannerOverviewComponent } from './components/planner/planner-overview/planner-overview.component';
import { PlannerDetailComponent } from './components/planner/planner-detail/planner-detail.component';
import { PlannerEditComponent } from './components/planner/planner-edit/planner-edit.component';
import { ShoppinglistComponent } from './components/shoppinglist/shoppinglist.component';
import { UnitsComponent } from './components/settings/units/units.component';

const routes: Routes = [
  {path: '', component: OverviewComponent},
  {path: 'recipe/create', component: EditComponent, pathMatch: 'full'},
  {path: 'recipe/edit/:recipeId', component: EditComponent, pathMatch: 'full'},
  {path: 'recipe/:recipeId', component: DetailComponent},
  {path: 'plan/:planId/shoppinglist', component: ShoppinglistComponent, pathMatch: 'full'},
  {path: 'plan/create', component: PlannerEditComponent, pathMatch: 'full'},
  {path: 'plan/edit/:mealPlanId', component: PlannerEditComponent, pathMatch: 'full'},
  {path: 'plan/:planId', component: PlannerDetailComponent},
  {path: 'plan', component: PlannerOverviewComponent},
  {path: 'manage/units', component: UnitsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
