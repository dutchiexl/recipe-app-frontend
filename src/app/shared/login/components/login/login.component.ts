import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { LoginAction } from '../../../../core/authentication/store/auth.actions';
import { catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { invalid } from '@angular/compiler/src/render3/view/util';
import { LoadApplicationAction } from '../../../../modules/recipe/store/app.actions';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private store: Store
    ) {}

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: [undefined, Validators.required],
            password: [undefined, Validators.required]
        });
    }

    submitForm() {
        if (this.loginForm.valid) {

            this.store.dispatch(
                new LoginAction(
                    this.loginForm.get('username').value,
                    this.loginForm.get('password').value
                )
            ).pipe(
                catchError((err) => {
                    this.loginForm.setErrors({auth: 'invalid'});
                    return EMPTY;
                })
            ).subscribe(() => {
                this.store.dispatch(new LoadApplicationAction());
            });
        }
    }

    getErrorMessage() {
        return this.loginForm.hasError('auth') ? 'Username or password incorrect' : '';
    }
}
