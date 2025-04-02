import { Component } from '@angular/core';
import { FieldType, FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-formly-field-stepper',
  standalone: false,
  template: `
    <mat-horizontal-stepper linear>
      <mat-step *ngFor="let step of field.fieldGroup; let index = index; let last = last">
        <div class="p-grid p-fluid" style="margin-top: 2rem;">
          <ng-template matStepLabel>{{ step.props?.label || step.templateOptions?.label }}</ng-template>

          <div class="p-grid p-fluid w-100" style="margin-top: 2rem;">
                  <!-- Aqui está o segredo -->
                  <formly-form
                    [form]="form"
                    [fields]="[step]"
                    [model]="formControl?.value"
                  ></formly-form>
        </div>

          <div class="col-12 mt-4 text-center">
            <button matStepperPrevious *ngIf="index !== 0" pButton label="Voltar" icon="pi pi-arrow-left" class="p-button-secondary mr-2" type="button" style="width: 10%;"></button>
            <button matStepperNext *ngIf="!last" pButton label="Avançar" icon="pi pi-arrow-right" class="p-button-help" type="button" [disabled]="!isValid(step)" style="width: 10%;"></button>
            <button *ngIf="last" pButton label="Salvar" icon="pi pi-save" class="p-button-success" type="submit" [disabled]="!form.valid" style="width: 10%;"></button>
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
