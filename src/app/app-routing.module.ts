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
import { AuthGuard } from './core/guards/auth.guard';
import { LoginComponent } from './shared/login/components/login/login.component';
import { RecipeOverviewComponent } from './modules/themeing/components/recipe-overview/recipe-overview.component';
import { RecipeItemComponent } from './modules/themeing/components/recipe-item/recipe-item.component';
import { RecipeItemNoDescriptionComponent } from './modules/themeing/components/recipe-item-no-description/recipe-item-no-description.component';

const routes: Routes = [
    {
        path: 'themeing/overview', component: RecipeOverviewComponent
    },
    {
        path: 'themeing/item', component: RecipeItemComponent
    },
    {
        path: 'themeing/item-no-description', component: RecipeItemNoDescriptionComponent
    },
    {
        path: '', component: OverviewComponent, canActivate: [AuthGuard]
    },
    {
        path: 'login', component: LoginComponent, pathMatch: 'full'
    },
    {
        path: 'recipe/create', component: EditComponent, pathMatch: 'full', canActivate: [AuthGuard]
    },
    {
        path: 'recipe/edit/:recipeId', component: EditComponent, pathMatch: 'full', canActivate: [AuthGuard]
    },
    {
        path: 'recipe/:recipeId', component: DetailComponent, canActivate: [AuthGuard]
    },
    {
        path: 'plan/:planId/shoppinglist', component: ShoppinglistComponent, pathMatch: 'full', canActivate: [AuthGuard]
    },
    {
        path: 'plan/create', component: PlannerEditComponent, pathMatch: 'full', canActivate: [AuthGuard]
    },
    {
        path: 'plan/edit/:mealPlanId', component: PlannerEditComponent, pathMatch: 'full', canActivate: [AuthGuard]
    },
    {
        path: 'plan/:planId', component: PlannerDetailComponent, canActivate: [AuthGuard]
    },
    {
        path: 'plan', component: PlannerOverviewComponent, canActivate: [AuthGuard]
    },
    {
        path: 'manage/units', component: UnitsComponent, canActivate: [AuthGuard]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
