import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { AuthService } from './services/auth.service';
import { AuthGuard } from '../guards/auth.guard';
import { IsAuthorizedDirective } from './directives/is-authorized.directive';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';

@NgModule({
    declarations: [
        IsAuthorizedDirective
    ],
    imports: [
        CommonModule,
        NgxsStoragePluginModule.forRoot({
            key: 'auth.token'
        })
    ],
    exports: [
        IsAuthorizedDirective
    ],
    providers: [
        AuthService,
        AuthGuard,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        }
    ]
})
export class AuthenticationModule {
}

