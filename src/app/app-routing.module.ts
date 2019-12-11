import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OverviewComponent } from './modules/recipe/components/recipe/overview/overview.component';
import { DetailComponent } from './modules/recipe/components/recipe/detail/detail.component';
import { EditComponent } from './modules/recipe/components/recipe/edit/edit.component';
import { PlannerOverviewComponent } from './modules/recipe/components/planner/planner-overview/planner-overview.component';
import { PlannerDetailComponent } from './modules/recipe/components/planner/planner-detail/planner-detail.component';
import { PlannerEditComponent } from './modules/recipe/components/planner/planner-edit/planner-edit.component';
import { ShoppinglistComponent } from './modules/recipe/components/shoppinglist/shoppinglist.component';
import { UnitsComponent } from './modules/recipe/components/settings/units/units.component';

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
