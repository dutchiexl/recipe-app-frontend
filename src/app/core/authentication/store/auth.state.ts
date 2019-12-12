import { Action, Selector, State, StateContext } from '@ngxs/store';
import { AuthService } from '../services/auth.service';
import { tap } from 'rxjs/operators';
import { LoginAction, LogoutAction } from './auth.actions';
import produce from 'immer';
import { Navigate } from '@ngxs/router-plugin';

export class AuthStateModel {
    token: string;
    username: string;
}

@State<AuthStateModel>({
    name: 'auth',
    defaults: {
        token: undefined,
        username: undefined
    }
})
export class AuthState {

    constructor(private authService: AuthService) {}

    @Selector()
    public static getState(state: AuthStateModel) {
        return state;
    }

    @Selector()
    public static isLoggedIn(state: AuthStateModel) {
        return !!state.token;
    }

    @Selector()
    static token(state: AuthStateModel) { return state.token; }

    @Action(LoginAction)
    login(ctx: StateContext<AuthStateModel>, action: LoginAction) {
        return this.authService.login(action.username, action.password).pipe(tap((result: { token: string, redirect }) => {
            ctx.setState(
                produce(ctx.getState(), (draft) => {
                    draft.username = action.username;
                    draft.token = result.token;
                }),
            );
            ctx.dispatch(new Navigate(['']));
        }));
    }

    @Action(LogoutAction)
    logout(ctx: StateContext<AuthStateModel>) {
        ctx.setState(
            produce(ctx.getState(), (draft) => {
                draft.token = undefined;
                draft.username = undefined;
            }),
        );
    }
}
