import { Component, ElementRef, forwardRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import {
  ControlValueAccessor,
  FormBuilder,
  FormGroup,
  NG_VALUE_ACCESSOR,
  Validators
} from '@angular/forms';
import { Step } from '../../../../interfaces/recipe/step.interface';
import { HttpClient } from '@angular/common/http';

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
  @Input() step: Step;
  stepItemFormgroup: FormGroup;
  preview = '/images/placeholder.jpg';
  @ViewChild('fileInput', {static: true}) fileInput: ElementRef;

  onChange = (step: Step) => {};

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient) {
  }

  ngOnInit() {
    const name = this.step.name ? this.step.name : '';
    const text = this.step.text ? this.step.text : '';
    const imagePath = this.step.imagePath ? this.step.imagePath : '';

    this.stepItemFormgroup = this.formBuilder.group({
      name: [name, Validators.required],
      text: [text, Validators.required],
      imagePath: [imagePath, [Validators.required]]
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
    this.step.name = this.stepItemFormgroup.get('name').value;
    this.step.text = this.stepItemFormgroup.get('text').value;
    this.step.imagePath = this.stepItemFormgroup.get('imagePath').value;
    this.onChange(this.step);
  }

  uploadFile(event) {
    const file = (event.target as HTMLInputElement).files[0];

    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.preview = reader.result as string;
    };
    reader.readAsDataURL(file);

    let formData = new FormData();
    formData.append('image', file);

    this.http.post('/api/upload', formData)
      .subscribe((response) => {
        let filename = response['fileName'].split('/');
        this.stepItemFormgroup.patchValue({
          imagePath: '/images/' + filename[filename.length - 1]
        });
        this.stepItemFormgroup.get('imagePath').updateValueAndValidity();
        console.log(this.stepItemFormgroup.get('imagePath').value);
      })
  }
}
