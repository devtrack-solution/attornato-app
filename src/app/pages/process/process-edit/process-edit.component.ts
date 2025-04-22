import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FormlyFormOptions, FormlyFieldConfig, FormlyModule } from '@ngx-formly/core';
import { ButtonModule } from 'primeng/button';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CustomerService } from 'src/app/shared/service/customer.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProcessService } from '../service/process.service';

@Component({
  selector: 'app-process-edit',
  standalone: true,
  imports: [FormlyModule, FormsModule, SharedModule, CommonModule, ButtonModule,
    RadioButtonModule, FormlyModule],
  templateUrl: './process-edit.component.html',
  styleUrl: './process-edit.component.scss'
})
export class ProcessEditComponent implements OnInit {

  form = new FormGroup({});
  options: FormlyFormOptions = {};
  model: any = {};
  fields: FormlyFieldConfig[] | any;
  private router = inject(Router);
  @ViewChild('showConfirm') showConfirm: any;
  processService = inject(ProcessService)
  tipoProcesso: any = '';

  message: string = '';

  ngOnInit(): void {
    this.model = {
      "processType": "administrativo",
      "nProcesso": "0000701-86.2020.5.08.0106",
      "customerName": "Cliente Da Silva",
      "adverso": "Exemplo Adverso",
      "folder": "0000701-86.2020.5.08.0106",
    }
    if (this.model.processType === 'judicial') {
      this.tipoProcesso = 'Judicial'
      this.populateProcessoJudicial();
    } else {
      this.tipoProcesso = 'Administrativo'
      this.populateProcessoAdministrativo();
    }
  }

  populateProcessoJudicial() {
    this.fields = [
      {
        type: 'stepper',
        fieldGroup: [
          {
            props: { label: 'Dados Inicial' },
            fieldGroupClassName: 'p-grid p-fluid',
            fieldGroup: [

              {
                key: 'groupProcess',
                type: 'select',
                className: 'p-col-12 p-md-3',
                templateOptions: {
                  label: 'Grupo de Processo',
                  placeholder: 'Escolha o grupo',
                  required: true,
                  attributes: {
                    autocomplete: 'off'
                  },
                  options: [{ label: 'Grupo Processo 01', value: 'Grupo Processo 01' }],
                  labelProp: 'label',
                  valueProp: 'value'
                }
              },
              {
                key: 'practiceArea',
                type: 'select',
                className: 'p-col-12 p-md-3',
                props: {
                  label: 'Área de Atuação',
                  placeholder: 'Escolha a área',
                  required: true,
                  attributes: {
                    autocomplete: 'off'
                  },
                  options: [{ label: 'Área 01', value: 'Área 01' },
                  { label: 'Área 02', value: 'Área 02' }
                  ],
                  labelProp: 'label',
                  valueProp: 'value'
                }
              },
              {
                key: 'nProcessAntigo',
                type: 'input',
                className: 'p-col-12 p-md-3',
                props: {
                  label: 'N° Processo (Antigo)',
                  placeholder: 'Informe o número do processo (antigo)',
                  required: true,
                }
              },
              {
                key: 'nProcessCNJ',
                type: 'input',
                className: 'p-col-12 p-md-3',
                props: {
                  label: 'N° Processo (CNJ)',
                  placeholder: 'Informe o número do processo (cnj)',
                  required: true,
                }
              },
              {
                key: 'folder',
                type: 'input',
                className: 'p-col-12 p-md-3',
                props: {
                  label: 'Pasta',
                  placeholder: 'Informe a pasta',
                  required: true,
                }
              },
              {
                key: 'label',
                type: 'input',
                className: 'p-col-12 p-md-3',
                props: {
                  label: 'Etiqueta',
                  placeholder: 'Informe a etiqueta',
                  required: true,
                }
              },
              {
                key: 'localProcedure',
                type: 'select',
                className: 'p-col-12 p-md-3',
                props: {
                  label: 'Local de Trâmite',
                  placeholder: 'Escolha o local',
                  required: true,
                  attributes: {
                    autocomplete: 'off'
                  },
                  options: [{ label: 'Local Trâmite 01', value: 'Local Trâmite 01' },
                  { label: 'Local Trâmite 02', value: 'Local Trâmite 02' }
                  ],
                  labelProp: 'label',
                  valueProp: 'value'
                }
              },
              {
                key: 'proceduralStatus',
                type: 'select',
                className: 'p-col-12 p-md-3',
                props: {
                  label: 'Status Processual',
                  placeholder: 'Escolha o status',
                  required: true,
                  attributes: {
                    autocomplete: 'off'
                  },
                  options: [{ label: 'Status Processual 01', value: 'Status Processual 01' },
                  { label: 'Status Processual 02', value: 'Status Processual 02' }
                  ],
                  labelProp: 'label',
                  valueProp: 'value'
                }
              },
              {
                key: 'county',
                type: 'select',
                className: 'p-col-12 p-md-3',
                props: {
                  label: 'Comarca',
                  placeholder: 'Escolha a comarca',
                  required: true,
                  attributes: {
                    autocomplete: 'off'
                  },
                  options: [{ label: 'Comarca 01', value: 'Comarca 01' },
                  { label: 'Comarca 02', value: 'Comarca 02' }
                  ],
                  labelProp: 'label',
                  valueProp: 'value'
                }
              },
              {
                key: 'phase',
                type: 'select',
                className: 'p-col-12 p-md-3',
                props: {
                  label: 'Fase',
                  placeholder: 'Escolha a fase',
                  required: true,
                  attributes: {
                    autocomplete: 'off'
                  },
                  options: [{ label: 'Fase 01', value: 'Fase 01' },
                  { label: 'Fase 02', value: 'Fase 02' }
                  ],
                  labelProp: 'label',
                  valueProp: 'value'
                }
              },
              {
                key: 'objectAction',
                type: 'select',
                className: 'p-col-12 p-md-3',
                props: {
                  label: 'Objeto de Ação',
                  placeholder: 'Escolha o Objeto de Ação',
                  required: true,
                  attributes: {
                    autocomplete: 'off'
                  },
                  options: [{ label: 'Objeto de Ação 01', value: 'Objeto de Ação 01' },
                  { label: 'Objeto de Ação 02', value: 'Objeto de Ação 02' }
                  ],
                  labelProp: 'label',
                  valueProp: 'value'
                }
              },
              {
                key: 'locator',
                type: 'select',
                className: 'p-col-12 p-md-3',
                props: {
                  label: 'Localizador',
                  placeholder: 'Escolha o Localizador',
                  required: true,
                  attributes: {
                    autocomplete: 'off'
                  },
                  options: [{ label: 'Localizador 01', value: 'Localizador 01' },
                  { label: 'Localizador 02', value: 'Localizador 02' }
                  ],
                  labelProp: 'label',
                  valueProp: 'value'
                }
              },
              {
                key: 'subjects',
                type: 'select',
                className: 'p-col-12 p-md-6',
                props: {
                  label: 'Assunto',
                  placeholder: 'Escolha o Assunto',
                  required: true,
                  attributes: {
                    autocomplete: 'off'
                  },
                  options: [{ label: 'Assunto 01', value: 'Assunto 01' },
                  { label: 'Assunto 02', value: 'Assunto 02' }
                  ],
                  labelProp: 'label',
                  valueProp: 'value'
                }
              },
              {
                key: 'responsible',
                type: 'select',
                className: 'p-col-12 p-md-6',
                props: {
                  label: 'Responsável',
                  placeholder: 'Escolha o Responsável',
                  required: true,
                  attributes: {
                    autocomplete: 'off'
                  },
                  options: [{ label: 'Responsável 01', value: 'Responsável 01' },
                  { label: 'Responsável 02', value: 'Responsável 02' }
                  ],
                  labelProp: 'label',
                  valueProp: 'value'
                }
              }
            ]
          },
          {
            props: { label: 'Dados Complementares' },
            fieldGroupClassName: 'p-grid p-fluid',
            fieldGroup: [
              {
                key: 'details',
                type: 'select',
                className: 'p-col-12 p-md-3',
                templateOptions: {
                  label: 'Detalhes',
                  placeholder: 'Escolha um detalhe',
                  required: true,
                  attributes: {
                    autocomplete: 'off'
                  },
                  options: [{ label: 'Detalhe 01', value: 'Detalhe 01' }],
                  labelProp: 'label',
                  valueProp: 'value'
                }
              },
              {
                key: 'partner',
                type: 'select',
                className: 'p-col-12 p-md-3',
                props: {
                  label: 'Parceiro',
                  placeholder: 'Escolha um parceiro',
                  required: true,
                  attributes: {
                    autocomplete: 'off'
                  },
                  options: [{ label: 'Parceiro 01', value: 'Parceiro 01' },
                  { label: 'Parceiro 02', value: 'Parceiro 02' }
                  ],
                  labelProp: 'label',
                  valueProp: 'value'
                }
              },
              {
                key: 'prognosis',
                type: 'select',
                className: 'p-col-12 p-md-3',
                props: {
                  label: 'Prognóstico',
                  placeholder: 'Escolha um Prognóstico',
                  required: true,
                  attributes: {
                    autocomplete: 'off'
                  },
                  options: [{ label: 'Prognóstico 01', value: 'Prognóstico 01' },
                  { label: 'Prognóstico 02', value: 'Prognóstico 02' }
                  ],
                  labelProp: 'label',
                  valueProp: 'value'
                }
              },
              {
                key: 'origin',
                type: 'select',
                className: 'p-col-12 p-md-3',
                props: {
                  label: 'Origem',
                  placeholder: 'Escolha uma origem',
                  required: true,
                  attributes: {
                    autocomplete: 'off'
                  },
                  options: [{ label: 'Origem 01', value: 'Origem 01' },
                  { label: 'Origem 02', value: 'Origem 02' }
                  ],
                  labelProp: 'label',
                  valueProp: 'value'
                }
              },
              {
                key: 'freeField1',
                type: 'select',
                className: 'p-col-12 p-md-4',
                props: {
                  label: 'Campo Livre 1',
                  placeholder: 'Escolha uma opção',
                  required: true,
                  attributes: {
                    autocomplete: 'off'
                  },
                  options: [{ label: 'Camnpo 01', value: 'Camnpo 01' },
                  { label: 'Camnpo 02', value: 'Camnpo 02' }
                  ],
                  labelProp: 'label',
                  valueProp: 'value'
                }
              },
              {
                key: 'freeField2',
                type: 'select',
                className: 'p-col-12 p-md-4',
                props: {
                  label: 'Campo Livre 2',
                  placeholder: 'Escolha uma opção',
                  required: true,
                  attributes: {
                    autocomplete: 'off'
                  },
                  options: [{ label: 'Camnpo 01', value: 'Camnpo 01' },
                  { label: 'Camnpo 02', value: 'Camnpo 02' }
                  ],
                  labelProp: 'label',
                  valueProp: 'value'
                }
              },
              {
                key: 'freeField3',
                type: 'select',
                className: 'p-col-12 p-md-4',
                props: {
                  label: 'Campo Livre 3',
                  placeholder: 'Escolha uma opção',
                  required: true,
                  attributes: {
                    autocomplete: 'off'
                  },
                  options: [{ label: 'Camnpo 01', value: 'Camnpo 01' },
                  { label: 'Camnpo 02', value: 'Camnpo 02' }
                  ],
                  labelProp: 'label',
                  valueProp: 'value'
                }
              },
              {
                key: 'freeField4',
                type: 'input',
                className: 'p-col-12 p-md-4',
                props: {
                  label: 'Campo Livre 4',
                  placeholder: 'Informe uma descrição',
                  required: true,
                }
              },
              {
                key: 'freeField5',
                type: 'input',
                className: 'p-col-12 p-md-4',
                props: {
                  label: 'Campo Livre 5',
                  placeholder: 'Informe uma descrição',
                  required: true,
                }
              },
              {
                key: 'freeField6',
                type: 'input',
                className: 'p-col-12 p-md-4',
                props: {
                  label: 'Campo Livre 6',
                  placeholder: 'Informe uma descrição',
                  required: true,
                }
              },
            ]
          },
          {
            props: { label: 'Datas / Valores' },
            fieldGroupClassName: 'p-grid p-fluid',
            fieldGroup: [
              {
                key: 'hiringAt',
                type: 'input',
                className: 'p-col-12 p-md-2',
                props: {
                  type: 'date',
                  label: 'Contratação',
                  placeholder: 'Informe a data',
                  required: true,
                }
              },
              {
                key: 'transitJudgedAt',
                type: 'input',
                className: 'p-col-12 p-md-2',
                props: {
                  type: 'date',
                  label: 'Trânsito Julgado',
                  placeholder: 'Informe a data',
                  required: true,
                }
              },
              {
                key: 'closureAt',
                type: 'input',
                className: 'p-col-12 p-md-2',
                props: {
                  type: 'date',
                  label: 'Encerramento',
                  placeholder: 'Informe a data',
                  required: true,
                }
              },
              {
                key: 'sentenceAt',
                type: 'input',
                className: 'p-col-12 p-md-2',
                props: {
                  type: 'date',
                  label: 'Sentença',
                  placeholder: 'Informe a data',
                  required: true,
                }
              },
              {
                key: 'distributionAt',
                type: 'input',
                className: 'p-col-12 p-md-2',
                props: {
                  type: 'date',
                  label: 'Distribuição',
                  placeholder: 'Informe a data',
                  required: true,
                }
              },
              {
                key: 'executionAt',
                type: 'input',
                className: 'p-col-12 p-md-2',
                props: {
                  type: 'date',
                  label: 'Execução',
                  placeholder: 'Informe a data',
                  required: true,
                }
              },
              {
                key: 'valueCause',
                type: 'currency',
                className: 'p-col-12 p-md-2',
                props: {
                  label: 'Valor da Causa',
                  placeholder: 'Informe o valor',
                  required: true,
                }
              },
              {
                key: 'otherValue',
                type: 'currency',
                className: 'p-col-12 p-md-2',
                props: {
                  label: 'Outro Valor',
                  placeholder: 'Informe o valor',
                  required: true,
                }
              },
              {
                key: 'contingency',
                type: 'currency',
                className: 'p-col-12 p-md-2',
                props: {
                  label: 'Contingência',
                  placeholder: 'Informe o valor',
                  required: true,
                }
              }
            ]
          },
          {
            props: { label: 'Dados Finais' },
            fieldGroupClassName: 'p-grid p-fluid',
            fieldGroup: [
              {
                key: 'pedido',
                type: 'input',
                className: 'p-col-12 p-md-12',
                props: {
                  label: 'Pedido',
                  placeholder: 'Descreva um pedido',
                  required: true,
                }
              },
              {
                key: 'observacoes',
                type: 'textarea',
                className: 'p-col-12 p-md-12',
                props: {
                  label: 'Observações',
                  placeholder: 'informa uma breve descrição',
                  rows: 5,
                  required: false,
                },
              },
              {
                key: 'secretJustice',
                type: 'radio',
                className: 'p-col-12 p-md-3',
                props: {
                  label: 'Segredo Justiça ?',
                  required: true,
                  options: [
                    { label: 'Sim', value: 'sim' },
                    { label: 'Não', value: 'nao' },
                  ]
                },
              },
              {
                key: 'captureProgress',
                type: 'radio',
                className: 'p-col-12 p-md-3',
                props: {
                  label: 'Capturar Andamentos ?',
                  required: true,
                  options: [
                    { label: 'Sim', value: 'sim' },
                    { label: 'Não', value: 'nao' },
                  ]
                },
              }
            ]
          },
        ]
      }
    ]
  }



  populateProcessoAdministrativo() {
    this.fields = [{
      type: 'stepper',
      fieldGroup: [
        {
          props: { label: 'Dados Inicial' },
          fieldGroupClassName: 'p-grid p-fluid',
          fieldGroup: [

            {
              key: 'groupProcess',
              type: 'select',
              className: 'p-col-12 p-md-3',
              templateOptions: {
                label: 'Grupo de Processo',
                placeholder: 'Escolha o grupo',
                required: true,
                attributes: {
                  autocomplete: 'off'
                },
                options: [{ label: 'Grupo Processo 01', value: 'Grupo Processo 01' }],
                labelProp: 'label',
                valueProp: 'value'
              }
            },
            {
              key: 'practiceArea',
              type: 'select',
              className: 'p-col-12 p-md-3',
              props: {
                label: 'Área de Atuação',
                placeholder: 'Escolha a área',
                required: true,
                attributes: {
                  autocomplete: 'off'
                },
                options: [{ label: 'Área 01', value: 'Área 01' },
                { label: 'Área 02', value: 'Área 02' }
                ],
                labelProp: 'label',
                valueProp: 'value'
              }
            },
            {
              key: 'nProcessAntigo',
              type: 'input',
              className: 'p-col-12 p-md-3',
              props: {
                label: 'N° Processo (Antigo)',
                placeholder: 'Informe o número do processo (antigo)',
                required: true,
              }
            },
            {
              key: 'folder',
              type: 'input',
              className: 'p-col-12 p-md-3',
              props: {
                label: 'Pasta',
                placeholder: 'Informe a pasta',
                required: true,
              }
            },
            {
              key: 'label',
              type: 'input',
              className: 'p-col-12 p-md-3',
              props: {
                label: 'Etiqueta',
                placeholder: 'Informe a etiqueta',
                required: true,
              }
            },
            {
              key: 'localProcedure',
              type: 'select',
              className: 'p-col-12 p-md-3',
              props: {
                label: 'Local de Trâmite',
                placeholder: 'Escolha o local',
                required: true,
                attributes: {
                  autocomplete: 'off'
                },
                options: [{ label: 'Local Trâmite 01', value: 'Local Trâmite 01' },
                { label: 'Local Trâmite 02', value: 'Local Trâmite 02' }
                ],
                labelProp: 'label',
                valueProp: 'value'
              }
            },
            {
              key: 'proceduralStatus',
              type: 'select',
              className: 'p-col-12 p-md-3',
              props: {
                label: 'Status Processual',
                placeholder: 'Escolha o status',
                required: true,
                attributes: {
                  autocomplete: 'off'
                },
                options: [{ label: 'Status Processual 01', value: 'Status Processual 01' },
                { label: 'Status Processual 02', value: 'Status Processual 02' }
                ],
                labelProp: 'label',
                valueProp: 'value'
              }
            },
            {
              key: 'county',
              type: 'select',
              className: 'p-col-12 p-md-3',
              props: {
                label: 'Comarca',
                placeholder: 'Escolha a comarca',
                required: true,
                attributes: {
                  autocomplete: 'off'
                },
                options: [{ label: 'Comarca 01', value: 'Comarca 01' },
                { label: 'Comarca 02', value: 'Comarca 02' }
                ],
                labelProp: 'label',
                valueProp: 'value'
              }
            },
            {
              key: 'phase',
              type: 'select',
              className: 'p-col-12 p-md-3',
              props: {
                label: 'Fase',
                placeholder: 'Escolha a fase',
                required: true,
                attributes: {
                  autocomplete: 'off'
                },
                options: [{ label: 'Fase 01', value: 'Fase 01' },
                { label: 'Fase 02', value: 'Fase 02' }
                ],
                labelProp: 'label',
                valueProp: 'value'
              }
            },
            {
              key: 'objectAction',
              type: 'select',
              className: 'p-col-12 p-md-3',
              props: {
                label: 'Objeto de Ação',
                placeholder: 'Escolha o Objeto de Ação',
                required: true,
                attributes: {
                  autocomplete: 'off'
                },
                options: [{ label: 'Objeto de Ação 01', value: 'Objeto de Ação 01' },
                { label: 'Objeto de Ação 02', value: 'Objeto de Ação 02' }
                ],
                labelProp: 'label',
                valueProp: 'value'
              }
            },
            {
              key: 'locator',
              type: 'select',
              className: 'p-col-12 p-md-3',
              props: {
                label: 'Localizador',
                placeholder: 'Escolha o Localizador',
                required: true,
                attributes: {
                  autocomplete: 'off'
                },
                options: [{ label: 'Localizador 01', value: 'Localizador 01' },
                { label: 'Localizador 02', value: 'Localizador 02' }
                ],
                labelProp: 'label',
                valueProp: 'value'
              }
            },
            {
              key: 'subjects',
              type: 'select',
              className: 'p-col-12 p-md-6',
              props: {
                label: 'Assunto',
                placeholder: 'Escolha o Assunto',
                required: true,
                attributes: {
                  autocomplete: 'off'
                },
                options: [{ label: 'Assunto 01', value: 'Assunto 01' },
                { label: 'Assunto 02', value: 'Assunto 02' }
                ],
                labelProp: 'label',
                valueProp: 'value'
              }
            },
            {
              key: 'responsible',
              type: 'select',
              className: 'p-col-12 p-md-6',
              props: {
                label: 'Responsável',
                placeholder: 'Escolha o Responsável',
                required: true,
                attributes: {
                  autocomplete: 'off'
                },
                options: [{ label: 'Responsável 01', value: 'Responsável 01' },
                { label: 'Responsável 02', value: 'Responsável 02' }
                ],
                labelProp: 'label',
                valueProp: 'value'
              }
            }
          ]
        },
        {
          props: { label: 'Dados Complementares' },
          fieldGroupClassName: 'p-grid p-fluid',
          fieldGroup: [
            {
              key: 'details',
              type: 'select',
              className: 'p-col-12 p-md-3',
              templateOptions: {
                label: 'Detalhes',
                placeholder: 'Escolha um detalhe',
                required: true,
                attributes: {
                  autocomplete: 'off'
                },
                options: [{ label: 'Detalhe 01', value: 'Detalhe 01' }],
                labelProp: 'label',
                valueProp: 'value'
              }
            },
            {
              key: 'partner',
              type: 'select',
              className: 'p-col-12 p-md-3',
              props: {
                label: 'Parceiro',
                placeholder: 'Escolha um parceiro',
                required: true,
                attributes: {
                  autocomplete: 'off'
                },
                options: [{ label: 'Parceiro 01', value: 'Parceiro 01' },
                { label: 'Parceiro 02', value: 'Parceiro 02' }
                ],
                labelProp: 'label',
                valueProp: 'value'
              }
            },
            {
              key: 'prognosis',
              type: 'select',
              className: 'p-col-12 p-md-3',
              props: {
                label: 'Prognóstico',
                placeholder: 'Escolha um Prognóstico',
                required: true,
                attributes: {
                  autocomplete: 'off'
                },
                options: [{ label: 'Prognóstico 01', value: 'Prognóstico 01' },
                { label: 'Prognóstico 02', value: 'Prognóstico 02' }
                ],
                labelProp: 'label',
                valueProp: 'value'
              }
            },
            {
              key: 'origin',
              type: 'select',
              className: 'p-col-12 p-md-3',
              props: {
                label: 'Origem',
                placeholder: 'Escolha uma origem',
                required: true,
                attributes: {
                  autocomplete: 'off'
                },
                options: [{ label: 'Origem 01', value: 'Origem 01' },
                { label: 'Origem 02', value: 'Origem 02' }
                ],
                labelProp: 'label',
                valueProp: 'value'
              }
            },
            {
              key: 'freeField1',
              type: 'select',
              className: 'p-col-12 p-md-4',
              props: {
                label: 'Campo Livre 1',
                placeholder: 'Escolha uma opção',
                required: true,
                attributes: {
                  autocomplete: 'off'
                },
                options: [{ label: 'Camnpo 01', value: 'Camnpo 01' },
                { label: 'Camnpo 02', value: 'Camnpo 02' }
                ],
                labelProp: 'label',
                valueProp: 'value'
              }
            },
            {
              key: 'freeField2',
              type: 'select',
              className: 'p-col-12 p-md-4',
              props: {
                label: 'Campo Livre 2',
                placeholder: 'Escolha uma opção',
                required: true,
                attributes: {
                  autocomplete: 'off'
                },
                options: [{ label: 'Camnpo 01', value: 'Camnpo 01' },
                { label: 'Camnpo 02', value: 'Camnpo 02' }
                ],
                labelProp: 'label',
                valueProp: 'value'
              }
            },
            {
              key: 'freeField3',
              type: 'select',
              className: 'p-col-12 p-md-4',
              props: {
                label: 'Campo Livre 3',
                placeholder: 'Escolha uma opção',
                required: true,
                attributes: {
                  autocomplete: 'off'
                },
                options: [{ label: 'Camnpo 01', value: 'Camnpo 01' },
                { label: 'Camnpo 02', value: 'Camnpo 02' }
                ],
                labelProp: 'label',
                valueProp: 'value'
              }
            },
            {
              key: 'freeField4',
              type: 'input',
              className: 'p-col-12 p-md-4',
              props: {
                label: 'Campo Livre 4',
                placeholder: 'Informe uma descrição',
                required: true,
              }
            },
            {
              key: 'freeField5',
              type: 'input',
              className: 'p-col-12 p-md-4',
              props: {
                label: 'Campo Livre 5',
                placeholder: 'Informe uma descrição',
                required: true,
              }
            },
            {
              key: 'freeField6',
              type: 'input',
              className: 'p-col-12 p-md-4',
              props: {
                label: 'Campo Livre 6',
                placeholder: 'Informe uma descrição',
                required: true,
              }
            },
          ]
        },
        {
          props: { label: 'Datas / Valores' },
          fieldGroupClassName: 'p-grid p-fluid',
          fieldGroup: [
            {
              key: 'hiringAt',
              type: 'input',
              className: 'p-col-12 p-md-2',
              props: {
                type: 'date',
                label: 'Contratação',
                placeholder: 'Informe a data',
                required: true,
              }
            },
            {
              key: 'transitJudgedAt',
              type: 'input',
              className: 'p-col-12 p-md-2',
              props: {
                type: 'date',
                label: 'Trânsito Julgado',
                placeholder: 'Informe a data',
                required: true,
              }
            },
            {
              key: 'closureAt',
              type: 'input',
              className: 'p-col-12 p-md-2',
              props: {
                type: 'date',
                label: 'Encerramento',
                placeholder: 'Informe a data',
                required: true,
              }
            },
            {
              key: 'sentenceAt',
              type: 'input',
              className: 'p-col-12 p-md-2',
              props: {
                type: 'date',
                label: 'Sentença',
                placeholder: 'Informe a data',
                required: true,
              }
            },
            {
              key: 'distributionAt',
              type: 'input',
              className: 'p-col-12 p-md-2',
              props: {
                type: 'date',
                label: 'Distribuição',
                placeholder: 'Informe a data',
                required: true,
              }
            },
            {
              key: 'executionAt',
              type: 'input',
              className: 'p-col-12 p-md-2',
              props: {
                type: 'date',
                label: 'Execução',
                placeholder: 'Informe a data',
                required: true,
              }
            },
            {
              key: 'valueCause',
              type: 'currency',
              className: 'p-col-12 p-md-2',
              props: {
                label: 'Valor da Causa',
                placeholder: 'Informe o valor',
                required: true,
              }
            },
            {
              key: 'otherValue',
              type: 'currency',
              className: 'p-col-12 p-md-2',
              props: {
                label: 'Outro Valor',
                placeholder: 'Informe o valor',
                required: true,
              }
            },
            {
              key: 'contingency',
              type: 'currency',
              className: 'p-col-12 p-md-2',
              props: {
                label: 'Contingência',
                placeholder: 'Informe o valor',
                required: true,
              }
            }
          ]
        },
        {
          props: { label: 'Dados Finais' },
          fieldGroupClassName: 'p-grid p-fluid',
          fieldGroup: [
            {
              key: 'pedido',
              type: 'input',
              className: 'p-col-12 p-md-12',
              props: {
                label: 'Pedido',
                placeholder: 'Descreva um pedido',
                required: true,
              }
            },
            {
              key: 'observacoes',
              type: 'textarea',
              className: 'p-col-12 p-md-12',
              props: {
                label: 'Observações',
                placeholder: 'informa uma breve descrição',
                rows: 5,
                required: false,
              },
            },
            {
              key: 'secretJustice',
              type: 'radio',
              className: 'p-col-12 p-md-3',
              props: {
                label: 'Segredo Justiça ?',
                required: true,
                options: [
                  { label: 'Sim', value: 'sim' },
                  { label: 'Não', value: 'nao' },
                ]
              },
            },
            {
              key: 'captureProgress',
              type: 'radio',
              className: 'p-col-12 p-md-3',
              props: {
                label: 'Capturar Andamentos ?',
                required: true,
                options: [
                  { label: 'Sim', value: 'sim' },
                  { label: 'Não', value: 'nao' },
                ]
              },
            }
          ]
        },
      ]
    }
    ]
  }

  async voltar() {
    this.router.navigate(['/admin/process']);
  }

  async onSubmit(model: any): Promise<void> {
    // await this.showConfirm.openLg(model);

    console.log('Modelo enviado:', model)
  }
}
