/**
 * Created by Wilton Oliveira Ferreira on 03/03/2023
 */
import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { FieldType } from '@ngx-formly/core';
import { PrimeNGConfig } from "primeng/api";
import { TypeService } from "./type.service";

@Component({
  selector: 'app-mult-select',
  template: `
    <div class="form-group pd-5">
      <label class="mb-2" *ngIf="props.label">{{ props.label }}{{ props.required ? '*' : '' }}</label>
      <span class="p-fluid">
      <p-multiSelect 
        [style]="{ minHeight: '44px', height: '44px', borderRadius: '8px', paddingLeft: '0px'}"
        [options]="items"
        [formControl]="formControl"
        [placeholder]="props.placeholder"
        [optionLabel]="props.labelProp"
        [optionValue]="props.valueProp"
        [filterBy]="props.labelProp"
        [showClear]="props.showClear ?? false"
        (onChange)="select($event)"
        [filter]="true"
        [selectedItemsLabel]="'{0} items selecionados'"
        display="chip"
      ></p-multiSelect>
      </span>
    </div>
  `,
  styleUrls: ['./type.scss']
})
export class MultSelectType extends FieldType<any> implements OnInit {
  selected: any
  countries!: any[]
  filtered!: any[]
  search = ''
  items: any[] = []
  selectedItens: any[] = []
  count = 100
  first = 0

  constructor(
    private primengConfig: PrimeNGConfig,
    private readonly changeDetector: ChangeDetectorRef,
    protected readonly typeService: TypeService,
  ) {
    super()
  }

  async ngOnInit(): Promise<void> {
    this.typeService.typeMultSelectSubject.subscribe((value: Map<string, any>) => {
      if (value.has(this.key.toString())) {
        this.selectedItens = value.get(this.key.toString());
      }
    });

    this.primengConfig.ripple = true;
    this.items = this.field.props.options as any
    const model = []
    const caminho = this.key.toString().split('.');
    const objectReduce = caminho.reduce((obj, chave) => (obj && obj[chave]) || obj, this.model);

    for (let index = 0; index < this.items.length; index++) {
      for (let index2 = 0; index2 < objectReduce?.length; index2++) {
        if (this.conditionals(this.items[index], objectReduce[index2])) {
          model.push(this.items[index])
        }
      }
    }
    this.selectedItens = model;

    // Sincronize o valor inicial do formControl com os IDs de selectedItens
  this.formControl.setValue(this.selectedItens.map(item => item.id));
    this.changeDetector.detectChanges();
  }

  async select(event: any): Promise<void> {
    // this.model[this.field.key.toString()] = event.value
    return event.value
  }

  formatOptions(value: any): any {
    if (this.props.formatOptions !== undefined) {
      return this.props?.formatOptions(value)
    } else {
      return value
    }
  }

  conditionals(key: any, model: any) {
    if (key.type == undefined || key.type == null) {
      if (key.id == model.id) {
        return true
      } else {
        return false
      }
    } else {
      if (key.type == model.type) {
        return true
      }
      else
        return false
    }
  }
}
