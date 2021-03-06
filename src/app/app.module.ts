import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxsModule, Store } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { FormGroupDirective } from './modules/recipe/directives/form-group-directive.directive';
import { AppState } from './modules/recipe/store/app.state';
import { RecipeModule } from './modules/recipe/recipe.module';
import { MaterialModule } from './core/material/material.module';
import { AuthState } from './core/authentication/store/auth.state';
import { AuthenticationModule } from './core/authentication/authentication.module';
import { SharedModule } from './shared/shared.module';
import { environment } from '../environments/environment';
import { LoadApplicationAction } from './modules/recipe/store/app.actions';
import { ShareComponent } from './modules/recipe/components/shared/share/share.component';
import {ReactiveFormsModule} from "@angular/forms";
import { FormsModule } from '@angular/forms';
import {MessagebarModule} from "./modules/messagebar/messagebar.module";
import {MessagebarComponent} from "./modules/messagebar/components/messagebar/messagebar.component";


@NgModule({
    declarations: [
        AppComponent,
        FormGroupDirective,
        ShareComponent,
        MessagebarComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        MaterialModule,
        MessagebarModule,
        RecipeModule,
        AuthenticationModule,
        SharedModule,
        NgxsModule.forRoot([
                AppState,
                AuthState,
            ],
            {developmentMode: !environment.production}),
        NgxsReduxDevtoolsPluginModule.forRoot({disabled: environment.production}),
        NgxsRouterPluginModule.forRoot(),
        ReactiveFormsModule,
        FormsModule,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {

    constructor(private store: Store) {
        store.dispatch(new LoadApplicationAction(store.selectSnapshot(AuthState.isLoggedIn)));
    }
}
