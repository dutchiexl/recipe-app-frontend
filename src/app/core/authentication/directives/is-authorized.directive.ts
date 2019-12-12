import { Directive, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { Store } from '@ngxs/store';
import { AuthState } from '../store/auth.state';

@Directive({selector: '[isAuthorized]'})
export class IsAuthorizedDirective implements OnInit {
    private hasView = false;

    constructor(
        private store: Store,
        private templateRef: TemplateRef<any>,
        private vcr: ViewContainerRef) {
        this.setView(this.store.selectSnapshot(AuthState.isLoggedIn));
    }

    ngOnInit() {
        this.store.select(AuthState.isLoggedIn).subscribe((authorized) => {
            this.setView(authorized);
        });
    }

    private setView(authorized: boolean) {
        if (authorized && !this.hasView) {
            this.vcr.createEmbeddedView(this.templateRef);
            this.hasView = true;
        } else if (!authorized && this.hasView) {
            this.vcr.clear();
            this.hasView = false;
        }
    }
}
