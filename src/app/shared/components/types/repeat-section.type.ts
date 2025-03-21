/**
 * Created by Wilton Oliveira Ferreira on 17/02/2023
 */

import { Component } from '@angular/core';
import { FieldArrayType } from '@ngx-formly/core';

@Component({
  selector: 'app-formly-repeat-section',
  standalone: false,
  template: `
    <div class="mb-3">
      <h5 *ngIf="props.label">{{ props.label }}</h5>
      <p *ngIf="props.description">{{ props.description }}</p>

      <div *ngFor="let field of field.fieldGroup; let i = index" class="row align-items-baseline">
        <formly-field class="col" [field]="field"></formly-field>
        <div class="col-1 d-flex align-items-center">
          <button class="btn btn-danger" type="button" (click)="remove(i)"><i class="ti ti-minus"></i></button>
        </div>
      </div>
      <div class="d-flex mt-3 col-12 btn-page">
        <button class="btn btn-primary d-inline-flex" type="button" (click)="add()"><i class="ti ti-plus"></i></button>
      </div>
    </div>
  `
})
export class RepeatTypeComponent extends FieldArrayType {}
