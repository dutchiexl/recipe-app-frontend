export class LoginAction {
    static readonly type = '[Auth] Login';

    constructor(public username: string, public password: string) {}
}

export class LogoutAction {
    static readonly type = '[Auth] Logout';
}
