import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import {
  trigger,
  style,
  animate,
  transition,
  state
} from '@angular/animations';


@Component({
  selector: 'app-form-stepper',
  standalone: false,
  templateUrl: './form-stepper.component.html',
  styleUrls: ['./form-stepper.component.scss'],
  animations: [
    trigger('stepAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(30px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ opacity: 0, transform: 'translateX(-30px)' }))
      ])
    ])
  ]
})
export class FormStepperComponent {
  @Input() form!: FormGroup;
  @Input() model: any = {};
  @Input() fields: FormlyFieldConfig[] = [];

  @Output() submit = new EventEmitter<any>();

  isValidGroup(group: FormlyFieldConfig): boolean {
    return group.fieldGroup?.every((f) => { 
      if (f.formControl) return f.formControl.valid;
      return true;
    }) ?? true;
  }

  onSubmit() {
    if (this.form.valid) {
      this.submit.emit(this.model);
    }
  }
}
