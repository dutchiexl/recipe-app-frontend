import { Component, ElementRef, forwardRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { Step } from '../../../../interfaces/recipe/step.interface';
import { HttpClient } from '@angular/common/http';
import { StepUtil } from '../../../../utils/step.util';

@Component({
    selector: 'app-edit-step',
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => EditStepComponent),
            multi: true
        }
    ]
})
export class EditStepComponent implements ControlValueAccessor, OnChanges, OnInit {
    @Input() step: Step = StepUtil.createEmpty();
    stepItemFormGroup: FormGroup;
    formStep: Step = StepUtil.createEmpty();
    preview = '/images/placeholder.jpg';
    @ViewChild('fileInput', {static: true}) fileInput: ElementRef;

    onChange = (step: Step) => {};

    constructor(
        private formBuilder: FormBuilder,
        private http: HttpClient) {
    }

    ngOnInit() {
        this.formStep.name = this.step.name ? this.step.name : '';
        this.formStep.text = this.step.text ? this.step.text : '';
        this.formStep.imagePath = this.step.imagePath ? this.step.imagePath : '';

        this.stepItemFormGroup = this.formBuilder.group({
            name: [this.formStep.name, Validators.required],
            text: [this.formStep.text, Validators.required],
            imagePath: [this.formStep.imagePath, [Validators.required]]
        });
    }

    ngOnChanges(changes: SimpleChanges): void {
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
    }

    setDisabledState(isDisabled: boolean): void {
    }

    writeValue(obj: any): void {
    }

    updateStep(event: Event) {
        this.formStep.name = this.stepItemFormGroup.get('name').value;
        this.formStep.text = this.stepItemFormGroup.get('text').value;
        this.formStep.imagePath = this.stepItemFormGroup.get('imagePath').value;
        this.onChange(this.formStep);
    }

    uploadFile(event) {
        const file = (event.target as HTMLInputElement).files[0];

        // File Preview
        const reader = new FileReader();
        reader.onload = () => {
            this.preview = reader.result as string;
        };
        reader.readAsDataURL(file);

        const formData = new FormData();
        formData.append('image', file);

        this.http.post('/api/upload', formData)
            .subscribe((response) => {
                const filename = response['fileName'].split('/');
                this.stepItemFormGroup.patchValue({
                    imagePath: '/images/' + filename[filename.length - 1]
                });
                this.stepItemFormGroup.get('imagePath').updateValueAndValidity();
                this.updateStep(null);
            });
    }
}
