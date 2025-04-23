import { Component } from '@angular/core';
import { FieldType, FormlyFieldConfig } from '@ngx-formly/core';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
@Component({
  selector: 'formly-field-stepper',
  animations: [
    trigger('stepAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(20px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateX(0)' })),
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ opacity: 0, transform: 'translateX(-20px)' }))
      ])
    ]),
  ],
  template: `
  <mat-horizontal-stepper linear>
    <mat-step  *ngFor="let step of field.fieldGroup; let index = index; let last = last; ">
          <div style="margin-top: 3%;" [@stepAnimation] >
          <ng-template matStepLabel>{{ step.templateOptions.label }}</ng-template>
            <formly-field [field]="step"></formly-field>
            <div class="d-flex flex-wrap gap-2 align-items-center justify-content-center mt-5">
            </div>
            <div class="col-12 mt-4 text-center">
              <button matStepperPrevious *ngIf="index !== 0" pButton label="Voltar" icon="pi pi-arrow-left" class="p-button-secondary mr-2" type="button" style="width: 10%;"></button>
              <button matStepperNext *ngIf="!last" pButton label="Avançar" icon="pi pi-arrow-right" class="p-button-help" type="button" [disabled]="!isValid(step)" style="width: 10%;"></button>
              <button *ngIf="last" pButton label="Salvar" icon="pi pi-save" class="p-button-success" type="submit" [disabled]="!form.valid" style="width: 10%;"></button>
            </div>
          </div>
      </mat-step>
  </mat-horizontal-stepper>
`,
})

export class FormlyFieldStepper extends FieldType<any> {
  formSteps = {};

  isValid(field: FormlyFieldConfig): boolean {
    if (field.key && field.formControl) {
      return field.formControl.valid;
    }

    return field.fieldGroup ? field.fieldGroup.every((f) => this.isValid(f)) : true;
  }
}
