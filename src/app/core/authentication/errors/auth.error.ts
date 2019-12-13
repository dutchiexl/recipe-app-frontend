export class AuthError extends Error {
    constructor(public status: number, public message: string) {
        super();
    }
}
