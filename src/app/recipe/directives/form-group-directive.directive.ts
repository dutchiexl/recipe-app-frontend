import { Directive, OnDestroy, Optional, Self, SkipSelf } from '@angular/core';
import { FormGroupDirective as AngularFormGroupDirective } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Directive({
    selector: '[formGroup]'
})
export class FormGroupDirective implements OnDestroy {
    private destroyed = new Subject<void>();

    constructor(
        @Self() formGroupDirective: AngularFormGroupDirective,
        @Optional() @SkipSelf() parentFormGroupDirective: AngularFormGroupDirective
    ) {
        if (parentFormGroupDirective) {
            parentFormGroupDirective.ngSubmit.pipe(takeUntil(this.destroyed)).subscribe((event: any) => {
                formGroupDirective.onSubmit(event);
            });
        }
    }

    ngOnDestroy(): void {
        this.destroyed.next();
        this.destroyed.complete();
    }
}
