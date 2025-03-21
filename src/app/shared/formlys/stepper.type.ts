import { Component } from '@angular/core';
import { FieldType, FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-formly-field-stepper',
  standalone: false,
  template: `
    <mat-horizontal-stepper linear>
      <mat-step *ngFor="let step of field.fieldGroup; let index = index; let last = last">
        <div style="margin-top: 3%;">
          <ng-template matStepLabel>{{ step.templateOptions.label }}</ng-template>
          <formly-field [field]="step"></formly-field>
          <div class="d-flex flex-wrap gap-2 align-items-center justify-content-center mt-5"></div>
          <div class="d-flex flex-wrap gap-2 align-items-center justify-content-center mt-5">
            <button matStepperPrevious *ngIf="index !== 0" class="btn btn-primary" type="button">Voltar</button>
            <button matStepperNext *ngIf="!last" class="btn btn-primary" type="button" [disabled]="!isValid(step)">Avançar</button>
            <button *ngIf="last" class="btn btn-success d-inline-flex" [disabled]="!form.valid" type="submit">Salvar</button>
          </div>
        </div>
      </mat-step>
    </mat-horizontal-stepper>
  `
})
export class FormlyFieldStepper extends FieldType<any> {
  isValid(field: FormlyFieldConfig): boolean {
    if (field.key && field.formControl) {
      return field.formControl.valid;
    }

    return field.fieldGroup ? field.fieldGroup.every((f) => this.isValid(f)) : true;
  }
}
