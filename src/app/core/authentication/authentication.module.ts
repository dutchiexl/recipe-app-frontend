import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { AuthService } from './services/auth.service';
import { AuthGuard } from '../guards/auth.guard';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        NgxsStoragePluginModule.forRoot({
            key: 'auth.token'
        })
    ],
    providers: [
        AuthService,
        AuthGuard
    ]
})
export class AuthenticationModule {
}

