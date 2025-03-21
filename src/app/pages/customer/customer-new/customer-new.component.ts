import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormlyFieldConfig, FormlyFormOptions, FormlyModule } from '@ngx-formly/core';
import { ButtonModule } from 'primeng/button';
import { CustomerService } from 'src/app/shared/service/customer.service';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-customer-new',
  standalone: true,
  imports: [FormlyModule, FormsModule, SharedModule, CommonModule, ButtonModule,
    FormlyBootstrapModule
  ],
  templateUrl: './customer-new.component.html',
  styleUrl: './customer-new.component.scss'
})
export class CustomerNewComponent implements OnInit {

  form = new FormGroup({});
  options: FormlyFormOptions = {};
  model: any = {};
  fields: FormlyFieldConfig[] | any;
  fieldsCustomer: FormlyFieldConfig[] | any;
  private router = inject(Router);
  @ViewChild('showConfirm') showConfirm: any;
  customerService = inject(CustomerService)

  message: string = '';

  ngOnInit(): void {
    this.fields = [
      {
        type: 'stepper',
        fieldGroup: [
          {
            props: {
              label: 'Dados da Máquina'
            },
            fieldGroupClassName: 'row',
            fieldGroup: [
              {
                key: 'name',
                type: 'primeng-input',
                className: 'col-12 col-md-6',
                props: {
                  label: 'Nome',
                  placeholder: 'Informe o nome',
                  required: true
                }
              },
              {
                key: 'machineCode',
                type: 'primeng-input',
                className: 'col-12 col-md-3',
                props: {
                  label: 'Código',
                  placeholder: 'Informe o codigo',
                  required: true
                }
              },
              {
                key: 'status',
                type: 'select',
                className: 'col-12 col-md-3',
                props: {
                  label: 'Status',
                  placeholder: 'Escolha o status',
                  required: true,
                  attributes: {
                    autocomplete: 'off'
                  },
                  options: [{ label: '1', value: '1'}],
                  labelProp: 'label',
                  valueProp: 'value'
                }
              },
              {
                key: 'description',
                type: 'textarea',
                className: 'col-12 col-md-12',
                props: {
                  label: 'Descrição',
                  placeholder: 'Informe uma breve descrição da máquina',
                  required: true,
                  rows: 7
                }
              }
            ]
          },
          {
            props: {
              label: 'Ficha Técnica'
            },
            key: 'technicalSpecification',
            fieldGroupClassName: 'row',
            fieldGroup: [
              {
                key: 'manufacturer',
                type: 'input',
                className: 'col-12 col-md-4',
                props: {
                  label: 'Fabricante',
                  placeholder: 'Informe o fabricante',
                  required: true
                }
              },
              {
                key: 'manufactureYear',
                type: 'number',
                className: 'col-12 col-md-2',
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
                className: 'col-12 col-md-3',
                props: {
                  label: 'Modelo',
                  placeholder: 'Informe o modelo',
                  required: false,
                  min: 0
                }
              },
              {
                key: 'serialNumber',
                type: 'input',
                className: 'col-12 col-md-3',
                props: {
                  label: 'Número de série',
                  placeholder: 'Informe a série',
                  required: false,
                  min: 0
                }
              },
              {
                key: 'requiredAreaM2',
                type: 'number',
                className: 'col-12 col-md-2',
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
                className: 'col-6 col-md-2',
                props: {
                  label: 'Data de Aquisição',
                  type: 'date',
                  required: false
                }
              },
              {
                key: 'acquisitionValue',
                type: 'money',
                className: 'col-4 col-md-2',
                props: {
                  label: 'Valor da aquisição (R$)',
                  placeholder: 'Informe o valor',
                  required: true
                }
              },
              {
                key: 'depreciatedMarketValue',
                type: 'money',
                className: 'col-4 col-md-2',
                props: {
                  label: 'Valor Depreciado (R$)',
                  placeholder: 'Informe o valor',
                  required: true
                }
              },
              {
                key: 'usefulLife',
                type: 'input',
                className: 'col-4 col-md-2',
                props: {
                  label: 'Vida útil (Anos)',
                  placeholder: 'Informe a vida útil',
                  required: true
                }
              },
              {
                key: 'energyConsumption',
                type: 'input',
                className: 'col-4 col-md-2',
                props: {
                  label: 'Consumo de energia (kw/h)',
                  placeholder: 'Informe o consumo de energia',
                  required: true
                }
              },
              {
                key: 'manuals',
                type: 'repeat',
                props: {
                  label: 'Adicionar Manuais',
                  required: false
                },
                fieldArray: {
                  fieldGroupClassName: 'row',
                  fieldGroup: [
                    {
                      key: 'link',
                      type: 'input',
                      className: 'col-12 col-md-6',
                      props: {
                        label: 'Link',
                        placeholder: 'Informe o link',
                        required: false,
                        attributes: {
                          autocomplete: 'off'
                        }
                      }
                    },
                    {
                      key: 'description',
                      type: 'input',
                      className: 'col-12 col-md-6',
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
    ];
  }

  async voltar() {
    this.router.navigate(['/admin/customer']);
  }

  async onSubmit(model: any): Promise<void> {
    await this.showConfirm.openLg(model);

  }
}
