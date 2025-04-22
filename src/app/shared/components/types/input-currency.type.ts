import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FieldType } from '@ngx-formly/core';


@Component({
    selector: 'formly-field-input-currency',
    standalone: false,
    template: `
    <label>{{to.label}}{{to.required ? ' *': ''}}</label>
    <p-inputNumber 
    [formControl]="formControlTyped"
      [formlyAttributes]="field"
      [mode]="'currency'"
      currency="BRL"
      locale="pt-BR"
      [minFractionDigits]="2"
      [maxFractionDigits]="2"
      class="form-control"
      [placeholder]="to.placeholder"
    ></p-inputNumber>
  `,
})
export class InputCurrencyTypeComponent extends FieldType {
    get formControlTyped(): FormControl {
        return this.formControl as FormControl;
    }
}