import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { AuthService } from './services/auth.service';
import { AuthGuard } from '../guards/auth.guard';
import { IsAuthorizedDirective } from './directives/is-authorized.directive';

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
        AuthGuard
    ]
})
export class AuthenticationModule {
}

