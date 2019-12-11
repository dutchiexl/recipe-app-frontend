import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { LoginAction } from '../../../../core/authentication/store/auth.actions';

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
            );
        }
    }
}
