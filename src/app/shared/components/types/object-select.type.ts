import { Component } from '@angular/core'
import { FormControl } from '@angular/forms'
import { FieldType } from '@ngx-formly/core'

@Component({
  selector: 'formly-field-custom-object-select',
  template: `
    <label *ngIf="to.label">{{ to.label }} <span *ngIf="to.required">*</span></label>
    <p-dropdown
      [formControl]="fc"
      [options]="optionsArray"
      [optionLabel]="to['labelProp'] || 'name'"
      [placeholder]="to.placeholder || 'Selecione'"
      [formlyAttributes]="field"
      appendTo="body"
      [autoDisplayFirst]="false"
      [showClear]="to['showClear'] || false">
    </p-dropdown>
  `,
})
export class CustomObjectSelectComponent extends FieldType {
  // Garante que o valor esteja tipado corretamente como FormControl
  get fc(): FormControl {
    return this.formControl as FormControl
  }

  // Garante que seja um array válido
  get optionsArray(): any[] {
    return Array.isArray(this.to.options) ? this.to.options : []
  }
}
