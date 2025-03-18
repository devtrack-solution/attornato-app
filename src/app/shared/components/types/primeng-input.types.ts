import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'formly-field-primeng-input',
  template: `
  <br/>
  <input  pInputText  
  [formlyAttributes]="field" 
  [placeholder]="props.placeholder">`,
})
export class FormlyPrimeInputComponent extends FieldType {}
