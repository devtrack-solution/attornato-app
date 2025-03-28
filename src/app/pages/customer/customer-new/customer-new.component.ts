import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormlyFieldConfig, FormlyFormOptions, FormlyModule } from '@ngx-formly/core';
import { FormlyPrimeNGModule } from '@ngx-formly/primeng';
import { ButtonModule } from 'primeng/button';
import { CustomerService } from 'src/app/shared/service/customer.service';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-customer-new',
  standalone: true,
  imports: [FormlyModule, FormsModule, SharedModule, CommonModule, ButtonModule,
    FormlyPrimeNGModule
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

  salvarFormulario(model: any) {
    console.log('Modelo enviado:', model)
    // aqui pode chamar o serviço que salva
  }

  async voltar() {
    this.router.navigate(['/admin/customer']);
  }

  async onSubmit(model: any): Promise<void> {
    await this.showConfirm.openLg(model);

  }
}
