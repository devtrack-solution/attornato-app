import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'app-date-mask-type',
  standalone: false,
  template: `
      <label>{{to.label}}{{to.required ? ' *': ''}}</label>
     <div class="col-8  mt-2 mb-2">
      <input
        class="form-control"
        type="text"
        mask="00/00/0000"
        placeHolder="00/00/0000"
        [formControl]="formControl" />
    </div>
    `

})
export class DateMaskTypeComponent extends FieldType<any> { }
