import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'app-pick-list-type',
  templateUrl: './pick-list-type.component.html',
  styleUrls: ['./pick-list-type.component.scss']
})
export class PickListTypeComponent extends FieldType<any> {

  constructor() {
    super()
  }
}
