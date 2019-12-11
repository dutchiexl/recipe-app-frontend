import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxsModule, Store } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { LoadApplicationAction } from './recipe/store/app.actions';
import { FormGroupDirective } from './recipe/directives/form-group-directive.directive';
import { AppState } from './recipe/store/app.state';
import { RecipeModule } from './recipe/recipe.module';
import { MaterialModule } from './material/material.module';

@NgModule({
    declarations: [
        AppComponent,
        FormGroupDirective
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        MaterialModule,
        RecipeModule,
        NgxsModule.forRoot([
            AppState
        ]),
        NgxsReduxDevtoolsPluginModule.forRoot(),
        NgxsRouterPluginModule.forRoot()
    ],
    bootstrap: [AppComponent]
})
export class AppModule {

    constructor(private store: Store) {
        store.dispatch(new LoadApplicationAction());
    }
}
