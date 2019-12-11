import { Action, Selector, State, StateContext } from '@ngxs/store';
import { AuthService } from '../services/auth.service';
import { tap } from 'rxjs/operators';
import { LoginAction, LogoutAction } from './auth.actions';
import produce from 'immer';

export class AuthStateModel {
    token: string;
    username: string;
}

@State<AuthStateModel>({
    name: 'Authentication',
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
    static token(state: AuthStateModel) { return state.token; }

    @Action(LoginAction)
    login(ctx: StateContext<AuthStateModel>, action: LoginAction) {
        return this.authService.login(action.username, action.password).pipe(tap((result: { token: string }) => {
            ctx.setState(
                produce(ctx.getState(), (draft) => {
                    draft.token = result.token;
                }),
            );
        }));
    }

    @Action(LogoutAction)
    logout({setState, getState}: StateContext<AuthStateModel>) {
        const {token} = getState();
        return this.authService.logout(token).pipe(tap(() => {
                setState(
                    produce(getState(), (draft) => {
                        draft.token = undefined;
                    }),
                );
            })
        );
    }
}
