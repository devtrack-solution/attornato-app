import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import {
  trigger,
  style,
  animate,
  transition,
  state
} from '@angular/animations';


@Component({
  selector: 'app-form-stepper',
  standalone: false,
  templateUrl: './form-stepper.component.html',
  styleUrls: ['./form-stepper.component.scss'],
  animations: [
    trigger('stepAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(30px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ opacity: 0, transform: 'translateX(-30px)' }))
      ])
    ])
  ]
})
export class FormStepperComponent implements OnInit{
  @Input() form!: FormGroup;
  @Input() model: any = {};
  @Input() fields: FormlyFieldConfig[] = [];

  @Output() submit = new EventEmitter<any>();


  ngOnInit(): void {
    this.fields = [
      {
        type: 'stepper',
        fieldGroup: [
          {
            props: { label: 'Dados Inicial' },
            fieldGroupClassName: 'p-grid',
            fieldGroup: [
              {
                key: 'name',
                type: 'input',
                className: 'p-col-12 p-md-6 p-fluid',
                templateOptions: {
                  label: 'Nome',
                  placeholder: 'Informe o nome',
                  required: true
                }
              },
              {
                key: 'machineCode',
                type: 'primeng-input',
                className: 'p-col-12 p-md-6 p-fluid',
                props: {
                  label: 'Código',
                  placeholder: 'Informe o código',
                  required: true
                }
              },
              {
                key: 'status',
                type: 'select',
                className: 'p-col-12 p-md-3 p-fluid',
                props: {
                  label: 'Status',
                  placeholder: 'Escolha o status',
                  required: true,
                  attributes: {
                    autocomplete: 'off'
                  },
                  options: [{ label: '1', value: '1' }],
                  labelProp: 'label',
                  valueProp: 'value'
                }
              },
              {
                key: 'description',
                type: 'textarea',
                className: 'p-col-12 p-fluid',
                props: {
                  label: 'Descrição',
                  placeholder: 'Informe uma breve descrição da máquina',
                  required: true,
                  rows: 9
                }
              }
            ]
          },
          {
            props: { label: 'Dados Complementares' },
            key: 'technicalSpecification',
            fieldGroupClassName: 'p-grid',
            fieldGroup: [
              {
                key: 'manufacturer',
                type: 'input',
                className: 'p-col-12 p-md-4 p-fluid',
                props: {
                  label: 'Fabricante',
                  placeholder: 'Informe o fabricante',
                  required: true
                }
              },
              {
                key: 'manufactureYear',
                type: 'number',
                className: 'p-col-12 p-md-2 p-fluid',
                props: {
                  label: 'Ano da fabricação',
                  placeholder: 'Informe o ano',
                  required: true,
                  min: 0
                }
              },
              {
                key: 'model',
                type: 'input',
                className: 'p-col-12 p-md-3 p-fluid',
                props: {
                  label: 'Modelo',
                  placeholder: 'Informe o modelo',
                  required: false
                }
              },
              {
                key: 'serialNumber',
                type: 'input',
                className: 'p-col-12 p-md-3 p-fluid',
                props: {
                  label: 'Número de série',
                  placeholder: 'Informe a série',
                  required: false
                }
              },
              {
                key: 'requiredAreaM2',
                type: 'number',
                className: 'p-col-12 p-md-2 p-fluid',
                props: {
                  label: 'Área (m²)',
                  placeholder: 'Informe a área',
                  required: true,
                  min: 0
                }
              },
              {
                key: 'acquisitionAt',
                type: 'input',
                className: 'p-col-12 p-md-2 p-fluid',
                props: {
                  label: 'Data de Aquisição',
                  type: 'date',
                  required: false
                }
              },
              {
                key: 'acquisitionValue',
                type: 'input',
                className: 'p-col-12 p-md-2 p-fluid',
                props: {
                  label: 'Valor da aquisição (R$)',
                  placeholder: 'Informe o valor',
                  required: true
                }
              },
              {
                key: 'depreciatedMarketValue',
                type: 'input',
                className: 'p-col-12 p-md-2 p-fluid',
                props: {
                  label: 'Valor Depreciado (R$)',
                  placeholder: 'Informe o valor',
                  required: true
                }
              },
              {
                key: 'usefulLife',
                type: 'input',
                className: 'p-col-12 p-md-2 p-fluid',
                props: {
                  label: 'Vida útil (Anos)',
                  placeholder: 'Informe a vida útil',
                  required: true
                }
              },
              {
                key: 'energyConsumption',
                type: 'input',
                className: 'p-col-12 p-md-2 p-fluid',
                props: {
                  label: 'Consumo de energia (kw/h)',
                  placeholder: 'Informe o consumo de energia',
                  required: true
                }
              },
              {
                key: 'manuals',
                type: 'repeat',
                className: 'p-col-12',
                props: {
                  label: 'Adicionar Manuais',
                  required: false
                },
                fieldArray: {
                  fieldGroupClassName: 'p-grid',
                  fieldGroup: [
                    {
                      key: 'link',
                      type: 'input',
                      className: 'p-col-12 p-md-6 p-fluid',
                      props: {
                        label: 'Link',
                        placeholder: 'Informe o link',
                        attributes: {
                          tooltip: 'Insira o link do manual',
                          tooltipPosition: 'top'
                        }
                      }
                    },
                    {
                      key: 'description',
                      type: 'input',
                      className: 'p-col-12 p-md-6 p-fluid',
                      props: {
                        label: 'Descrição',
                        placeholder: 'Informe a descrição',
                        required: false,
                        attributes: {
                          autocomplete: 'off'
                        }
                      }
                    }
                  ]
                }
              }
            ]
          }
        ]
      }
    ]

  }

  isValidGroup(group: FormlyFieldConfig): boolean {
    return group.fieldGroup?.every((f) => { 
      if (f.formControl) return f.formControl.valid;
      return true;
    }) ?? true;
  }

  onSubmit() {
    if (this.form.valid) {
      this.submit.emit(this.model);
    }
  }
}
