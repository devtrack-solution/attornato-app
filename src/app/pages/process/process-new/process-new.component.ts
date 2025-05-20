import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FormlyFieldConfig, FormlyFormOptions, FormlyModule } from '@ngx-formly/core';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProcessService } from '../service/process.service';
import { firstValueFrom, forkJoin } from 'rxjs';
import { FreeField2Service } from '../../settings/free-field2/service/free-field2.service';
import { ProcessGroupService } from '../../settings/process-group/service/process-group.serivce';
import { ObjectActionService } from '../../settings/object-action/service/object-action.service';
import { PracticeAreaService } from '../../settings/practice-area/service/practice-area.service';
import { PrognosisService } from '../../settings/prognosis/service/prognosis.service';
import { LocalProcedureService } from '../../settings/local-procedure/service/local-procedure.service';
import { PhaseService } from '../../settings/phase/service/phase.service';
import { ResponsibleService } from '../../settings/responsible/service/responsible.service';
import { ProceduralStatusService } from '../../settings/procedural-status/service/procedural-status.service';
import { CountysService } from '../../settings/county/service/county.service';
import { DetailsService } from '../../settings/details/service/details.service';
import { PartnerService } from '../../settings/partner/service/partner.service';
import { OriginService } from '../../settings/origin/service/origin.service';
import { SubjectService } from '../../settings/subjects/service/subjects.service';
import { LocatorService } from '../../settings/locator/service/locator.service';
import { CustomerService } from '../../customer/service/customer.service';

@Component({
  selector: 'app-process-new',
  standalone: true,
  imports: [FormlyModule, FormsModule, SharedModule, CommonModule, ButtonModule,
    RadioButtonModule, FormlyModule,],
  templateUrl: './process-new.component.html',
  styleUrl: './process-new.component.scss'
})
export class ProcessNewComponent implements OnInit {

  formAdm = new FormGroup({});
  formJudicial = new FormGroup({});
  options: FormlyFormOptions = {};
  modelAdm: any = {};
  fieldsAdministrativo: FormlyFieldConfig[] | any;
  fieldsJuridico: FormlyFieldConfig[] | any;
  fieldsCustomer: FormlyFieldConfig[] | any;
  private router = inject(Router);
  @ViewChild('showConfirm') showConfirm: any;
  processService = inject(ProcessService)
  freeField2Service = inject(FreeField2Service)
  groupProcessService = inject(ProcessGroupService)
  actionObjectService = inject(ObjectActionService)
  practiceAreaService = inject(PracticeAreaService)
  prognosisService = inject(PrognosisService)
  localProcedureNameService = inject(LocalProcedureService)
  phaseService = inject(PhaseService)
  responsibleService = inject(ResponsibleService)
  proceduralStatusService = inject(ProceduralStatusService)
  countyService = inject(CountysService)
  detailService = inject(DetailsService)
  partherService = inject(PartnerService)
  originService = inject(OriginService)
  subjectService = inject(SubjectService)
  locatorService = inject(LocatorService)
  clientService = inject(CustomerService)

  tipoPessoa: 'administrativo' | 'judicial' = 'administrativo';
  freeField6List: any[] = []
  groupProcessList: any[] = []
  practiceAreaList: any[] = []
  localProcedureNameList: any[] = []
  proceduralStatusList: any[] = []
  countyList: any[] = []
  phaseList: any[] = []
  actionObjectList: any[] = []
  locatorList: any[] = []
  subjectList: any[] = []
  responsibleList: any[] = []
  detailList: any[] = []
  partherList: any[] = []
  prognosisList: any[] = []
  originList: any[] = []
  freeField1List: any[] = []
  freeField2List: any[] = []
  clientList: any[] = []
  modelJudicial: any = {}

  constructor(private messageService: MessageService) {

  }

  message: string = '';

  async ngOnInit(): Promise<void> {
    await this.loadLists()
    this.populatePprocessoJuridico();
    this.populateProcessoAdministrativo();
  }

  populatePprocessoJuridico() {
    this.modelJudicial.favorite = false;
    this.fieldsJuridico = [{
      type: 'stepper',
      fieldGroup: [
        {
          props: { label: 'Dados Inicial' },
          fieldGroupClassName: 'p-grid p-fluid',
          fieldGroup: [
            {
              key: 'favorite',
              type: 'checkbox',
              className: 'p-col-12 p-md-12',
              props: {
                label: 'Processo Favorito',
                required: true,
              }
            },
            {
              key: 'clientId',
              type: 'select',
              className: 'p-col-12 p-md-3',
              templateOptions: {
                label: 'Nome Cliente',
                placeholder: 'Escolha o cliente',
                required: true,
                attributes: {
                  autocomplete: 'off'
                },
                options: this.clientList,
                labelProp: 'name',
                valueProp: 'id'
              }
            },
            {
              key: 'groupProcessId',
              type: 'select',
              className: 'p-col-12 p-md-3',
              templateOptions: {
                label: 'Grupo de Processo',
                placeholder: 'Escolha o grupo',
                required: true,
                attributes: {
                  autocomplete: 'off'
                },
                options: this.groupProcessList,
                labelProp: 'name',
                valueProp: 'id'
              }
            },
            {
              key: 'practiceAreaId',
              type: 'select',
              className: 'p-col-12 p-md-3',
              props: {
                label: 'Área de Atuação',
                placeholder: 'Escolha a área',
                required: true,
                attributes: {
                  autocomplete: 'off'
                },
                options: this.practiceAreaList,
                labelProp: 'name',
                valueProp: 'id'
              }
            },
            {
              key: 'processNumber',
              type: 'input',
              className: 'p-col-12 p-md-3',
              props: {
                label: 'N° Processo (Antigo)',
                placeholder: 'Informe o número do processo (antigo)',
                required: true,
              }
            },
            {
              key: 'cnjNumber',
              type: 'input',
              className: 'p-col-12 p-md-3',
              props: {
                label: 'N° Processo (CNJ)',
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
              key: 'phaseId',
              type: 'select',
              className: 'p-col-12 p-md-3',
              props: {
                label: 'Fase',
                placeholder: 'Escolha a fase',
                required: true,
                attributes: {
                  autocomplete: 'off'
                },
                options: this.phaseList,
                labelProp: 'name',
                valueProp: 'id'
              }
            },
            
            {
              key: 'localProcedureNumber',
              type: 'select',
              className: 'p-col-12 p-md-2',
              props: {
                label: 'Local de Trâmite',
                placeholder: 'Escolha a numeração',
                required: true,
                attributes: {
                  autocomplete: 'off'
                },
                options: this.localProceduralNumberList,
                labelProp: 'label',
                valueProp: 'value'
              }
            },
            {
              key: 'localProcedureNameId',
              type: 'select',
              className: 'p-col-12 p-md-4',
              props: {
                label: 'Local de Trâmite',
                placeholder: 'Escolha o local',
                required: true,
                attributes: {
                  autocomplete: 'off'
                },
                options: this.localProcedureNameList,
                labelProp: 'name',
                valueProp: 'id'
              }
            },
            {
              key: 'countyId',
              type: 'select',
              className: 'p-col-12 p-md-4',
              props: {
                label: 'Comarca',
                placeholder: 'Escolha a comarca',
                required: true,
                attributes: {
                  autocomplete: 'off'
                },
                options: this.countyList,
                labelProp: 'name',
                valueProp: 'id'
              }
            },
            {
              key: 'countyUf',
              type: 'select',
              className: 'p-col-12 p-md-2',
              props: {
                label: 'Comarca UF',
                placeholder: 'Escolha a comarca',
                required: true,
                attributes: {
                  autocomplete: 'off'
                },
                options: this.estados,
                labelProp: 'label',
                valueProp: 'value'
              }
            },
            {
              key: 'proceduralStatusId',
              type: 'select',
              className: 'p-col-12 p-md-4',
              props: {
                label: 'Status Processual',
                placeholder: 'Escolha o status',
                required: true,
                attributes: {
                  autocomplete: 'off'
                },
                options: this.proceduralStatusList,
                labelProp: 'name',
                valueProp: 'id'
              }
            },
            {
              key: 'actionObjectId',
              type: 'select',
              className: 'p-col-12 p-md-4',
              props: {
                label: 'Objeto de Ação',
                placeholder: 'Escolha o Objeto de Ação',
                required: true,
                attributes: {
                  autocomplete: 'off'
                },
                options: this.actionObjectList,
                labelProp: 'name',
                valueProp: 'id'
              }
            },
            {
              key: 'locatorId',
              type: 'select',
              className: 'p-col-12 p-md-4',
              props: {
                label: 'Localizador',
                placeholder: 'Escolha o Localizador',
                required: true,
                attributes: {
                  autocomplete: 'off'
                },
                options: this.locatorList,
                labelProp: 'name',
                valueProp: 'id'
              }
            },
            {
              key: 'subjectId',
              type: 'select',
              className: 'p-col-12 p-md-6',
              props: {
                label: 'Assunto',
                placeholder: 'Escolha o Assunto',
                required: true,
                attributes: {
                  autocomplete: 'off'
                },
                options: this.subjectList,
                labelProp: 'name',
                valueProp: 'id'
              }
            },
            {
              key: 'responsibleId',
              type: 'select',
              className: 'p-col-12 p-md-6',
              props: {
                label: 'Responsável',
                placeholder: 'Escolha o Responsável',
                required: true,
                attributes: {
                  autocomplete: 'off'
                },
                options: this.responsibleList,
                labelProp: 'name',
                valueProp: 'id'
              }
            }
          ]
        },
        {
          props: { label: 'Dados Complementares' },
          key: 'processDetail',
          fieldGroupClassName: 'p-grid p-fluid',
          fieldGroup: [
            {
              key: 'detailId',
              type: 'select',
              className: 'p-col-12 p-md-3',
              templateOptions: {
                label: 'Detalhes',
                placeholder: 'Escolha um detalhe',
                required: true,
                attributes: {
                  autocomplete: 'off'
                },
                options: this.detailList,
                labelProp: 'name',
                valueProp: 'id'
              }
            },
            {
              key: 'partnerId',
              type: 'select',
              className: 'p-col-12 p-md-3',
              props: {
                label: 'Parceiro',
                placeholder: 'Escolha um parceiro',
                required: true,
                attributes: {
                  autocomplete: 'off'
                },
                options: this.partherList,
                labelProp: 'name',
                valueProp: 'id'
              }
            },
            {
              key: 'prognosisId',
              type: 'select',
              className: 'p-col-12 p-md-3',
              props: {
                label: 'Prognóstico',
                placeholder: 'Escolha um Prognóstico',
                required: true,
                attributes: {
                  autocomplete: 'off'
                },
                options: this.prognosisList,
                labelProp: 'name',
                valueProp: 'id'
              }
            },
            {
              key: 'originId',
              type: 'select',
              className: 'p-col-12 p-md-3',
              props: {
                label: 'Origem',
                placeholder: 'Escolha uma origem',
                required: true,
                attributes: {
                  autocomplete: 'off'
                },
                options: this.originList,
                labelProp: 'name',
                valueProp: 'id'
              }
            },
            {
              key: 'freeField1Id',
              type: 'select',
              className: 'p-col-12 p-md-4',
              props: {
                label: 'Campo Livre 1',
                placeholder: 'Escolha uma opção',
                required: true,
                attributes: {
                  autocomplete: 'off'
                },
                options: this.freeField1List,
                labelProp: 'name',
                valueProp: 'id'
              }
            },
            {
              key: 'freeField2Id',
              type: 'select',
              className: 'p-col-12 p-md-4',
              props: {
                label: 'Campo Livre 2',
                placeholder: 'Escolha uma opção',
                required: true,
                attributes: {
                  autocomplete: 'off'
                },
                options: this.freeField2List,
                labelProp: 'name',
                valueProp: 'id'
              }
            },
            {
              key: 'freeField3',
              type: 'input',
              className: 'p-col-12 p-md-4',
              props: {
                label: 'Campo Livre 3',
                placeholder: 'Informe uma descrição',
                required: true,
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
              key: 'freeField6Id',
              type: 'select',
              className: 'p-col-12 p-md-4',
              props: {
                label: 'Campo Livre 6',
                placeholder: 'Escolha uma opção',
                required: true,
                attributes: {
                  autocomplete: 'off'
                },
                options: this.freeField6List,
                labelProp: 'name',
                valueProp: 'id'
              }
            },
          ]
        },
        {
          props: { label: 'Datas / Valores' },
          key: 'processFinancial',
          fieldGroupClassName: 'p-grid p-fluid',
          fieldGroup: [
            {
              key: 'hiring',
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
              key: 'resJudicata',
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
              key: 'closure',
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
              key: 'sentence',
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
              key: 'distribution',
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
              key: 'execution',
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
              key: 'causeValue',
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
              key: 'request',
              type: 'input',
              className: 'p-col-12 p-md-12',
              props: {
                label: 'Pedido',
                placeholder: 'Descreva um pedido',
                required: true,
              }
            },
            {
              key: 'note',
              type: 'textarea',
              className: 'p-col-12 p-md-12',
              props: {
                label: 'Observações',
                placeholder: 'informa uma breve descrição',
                rows: 5,
                required: true,
              },
            }
          ]
        },
      ]
    }
    ]
  }

  populateProcessoAdministrativo() {
    this.modelAdm.favorite = false
    this.fieldsAdministrativo = [{
      type: 'stepper',
      fieldGroup: [
        {
          props: { label: 'Dados Inicial' },
          fieldGroupClassName: 'p-grid p-fluid',
          fieldGroup: [
            {
              key: 'favorite',
              type: 'checkbox',
              className: 'p-col-12 p-md-12',
              props: {
                label: 'Processo Favorito',
                required: true,
              }
            },
            {
              key: 'clientId',
              type: 'select',
              className: 'p-col-12 p-md-3',
              templateOptions: {
                label: 'Nome Cliente',
                placeholder: 'Escolha o cliente',
                required: true,
                attributes: {
                  autocomplete: 'off'
                },
                options: this.clientList,
                labelProp: 'name',
                valueProp: 'id'
              }
            },
            {
              key: 'groupProcessId',
              type: 'select',
              className: 'p-col-12 p-md-3',
              templateOptions: {
                label: 'Grupo de Processo',
                placeholder: 'Escolha o grupo',
                required: true,
                attributes: {
                  autocomplete: 'off'
                },
                options: this.groupProcessList,
                labelProp: 'name',
                valueProp: 'id'
              }
            },
            {
              key: 'practiceAreaId',
              type: 'select',
              className: 'p-col-12 p-md-3',
              props: {
                label: 'Área de Atuação',
                placeholder: 'Escolha a área',
                required: true,
                attributes: {
                  autocomplete: 'off'
                },
                options: this.practiceAreaList,
                labelProp: 'name',
                valueProp: 'id'
              }
            },
            {
              key: 'processNumber',
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
              className: 'p-col-12 p-md-4',
              props: {
                label: 'Pasta',
                placeholder: 'Informe a pasta',
                required: true,
              }
            },
            {
              key: 'label',
              type: 'input',
              className: 'p-col-12 p-md-4',
              props: {
                label: 'Etiqueta',
                placeholder: 'Informe a etiqueta',
                required: true,
              }
            },
            {
              key: 'phaseId',
              type: 'select',
              className: 'p-col-12 p-md-4',
              props: {
                label: 'Fase',
                placeholder: 'Escolha a fase',
                required: true,
                attributes: {
                  autocomplete: 'off'
                },
                options: this.phaseList,
                labelProp: 'name',
                valueProp: 'id'
              }
            },
            {
              key: 'localProcedureNumber',
              type: 'select',
              className: 'p-col-12 p-md-2',
              props: {
                label: 'Local de Trâmite',
                placeholder: 'Escolha a numeração',
                required: true,
                attributes: {
                  autocomplete: 'off'
                },
                options: this.localProceduralNumberList,
                labelProp: 'label',
                valueProp: 'value'
              }
            },
            {
              key: 'localProcedureNameId',
              type: 'select',
              className: 'p-col-12 p-md-4',
              props: {
                label: 'Local de Trâmite',
                placeholder: 'Escolha o local',
                required: true,
                attributes: {
                  autocomplete: 'off'
                },
                options: this.localProcedureNameList,
                labelProp: 'name',
                valueProp: 'id'
              }
            },
            {
              key: 'countyId',
              type: 'select',
              className: 'p-col-12 p-md-4',
              props: {
                label: 'Comarca',
                placeholder: 'Escolha a comarca',
                required: true,
                attributes: {
                  autocomplete: 'off'
                },
                options: this.countyList,
                labelProp: 'name',
                valueProp: 'id'
              }
            },
            {
              key: 'countyUf',
              type: 'select',
              className: 'p-col-12 p-md-2',
              props: {
                label: 'Comarca UF',
                placeholder: 'Escolha a comarca',
                required: true,
                attributes: {
                  autocomplete: 'off'
                },
                options: this.estados,
                labelProp: 'label',
                valueProp: 'value'
              }
            },
            {
              key: 'proceduralStatusId',
              type: 'select',
              className: 'p-col-12 p-md-4',
              props: {
                label: 'Status Processual',
                placeholder: 'Escolha o status',
                required: true,
                attributes: {
                  autocomplete: 'off'
                },
                options: this.proceduralStatusList,
                labelProp: 'name',
                valueProp: 'id'
              }
            },
            {
              key: 'actionObjectId',
              type: 'select',
              className: 'p-col-12 p-md-4',
              props: {
                label: 'Objeto de Ação',
                placeholder: 'Escolha o Objeto de Ação',
                required: true,
                attributes: {
                  autocomplete: 'off'
                },
                options: this.actionObjectList,
                labelProp: 'name',
                valueProp: 'id'
              }
            },
            {
              key: 'locatorId',
              type: 'select',
              className: 'p-col-12 p-md-4',
              props: {
                label: 'Localizador',
                placeholder: 'Escolha o Localizador',
                required: true,
                attributes: {
                  autocomplete: 'off'
                },
                options: this.locatorList,
                labelProp: 'name',
                valueProp: 'id'
              }
            },
            {
              key: 'subjectId',
              type: 'select',
              className: 'p-col-12 p-md-6',
              props: {
                label: 'Assunto',
                placeholder: 'Escolha o Assunto',
                required: true,
                attributes: {
                  autocomplete: 'off'
                },
                options: this.subjectList,
                labelProp: 'name',
                valueProp: 'id'
              }
            },
            {
              key: 'responsibleId',
              type: 'select',
              className: 'p-col-12 p-md-6',
              props: {
                label: 'Responsável',
                placeholder: 'Escolha o Responsável',
                required: true,
                attributes: {
                  autocomplete: 'off'
                },
                options: this.responsibleList,
                labelProp: 'name',
                valueProp: 'id'
              }
            }
          ]
        },
        {
          props: { label: 'Dados Complementares' },
          key: 'processDetail',
          fieldGroupClassName: 'p-grid p-fluid',
          fieldGroup: [
            {
              key: 'detailId',
              type: 'select',
              className: 'p-col-12 p-md-3',
              templateOptions: {
                label: 'Detalhes',
                placeholder: 'Escolha um detalhe',
                required: true,
                attributes: {
                  autocomplete: 'off'
                },
                options: this.detailList,
                labelProp: 'name',
                valueProp: 'id'
              }
            },
            {
              key: 'partnerId',
              type: 'select',
              className: 'p-col-12 p-md-3',
              props: {
                label: 'Parceiro',
                placeholder: 'Escolha um parceiro',
                required: true,
                attributes: {
                  autocomplete: 'off'
                },
                options: this.partherList,
                labelProp: 'name',
                valueProp: 'id'
              }
            },
            {
              key: 'prognosisId',
              type: 'select',
              className: 'p-col-12 p-md-3',
              props: {
                label: 'Prognóstico',
                placeholder: 'Escolha um Prognóstico',
                required: true,
                attributes: {
                  autocomplete: 'off'
                },
                options: this.prognosisList,
                labelProp: 'name',
                valueProp: 'id'
              }
            },
            {
              key: 'originId',
              type: 'select',
              className: 'p-col-12 p-md-3',
              props: {
                label: 'Origem',
                placeholder: 'Escolha uma origem',
                required: true,
                attributes: {
                  autocomplete: 'off'
                },
                options: this.originList,
                labelProp: 'name',
                valueProp: 'id'
              }
            },
            {
              key: 'freeField1Id',
              type: 'select',
              className: 'p-col-12 p-md-4',
              props: {
                label: 'Campo Livre 1',
                placeholder: 'Escolha uma opção',
                required: true,
                attributes: {
                  autocomplete: 'off'
                },
                options: this.freeField1List,
                labelProp: 'name',
                valueProp: 'id'
              }
            },
            {
              key: 'freeField2Id',
              type: 'select',
              className: 'p-col-12 p-md-4',
              props: {
                label: 'Campo Livre 2',
                placeholder: 'Escolha uma opção',
                required: true,
                attributes: {
                  autocomplete: 'off'
                },
                options: this.freeField2List,
                labelProp: 'name',
                valueProp: 'id'
              }
            },
            {
              key: 'freeField3',
              type: 'input',
              className: 'p-col-12 p-md-4',
              props: {
                label: 'Campo Livre 3',
                placeholder: 'Informe uma descrição',
                required: true,
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
              key: 'freeField6Id',
              type: 'select',
              className: 'p-col-12 p-md-4',
              props: {
                label: 'Campo Livre 6',
                placeholder: 'Escolha uma opção',
                required: true,
                attributes: {
                  autocomplete: 'off'
                },
                options: this.freeField6List,
                labelProp: 'name',
                valueProp: 'id'
              }
            },
          ]
        },
        {
          props: { label: 'Datas / Valores' },
          key: 'processFinancial',
          fieldGroupClassName: 'p-grid p-fluid',
          fieldGroup: [
            {
              key: 'hiring',
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
              key: 'resJudicata',
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
              key: 'closure',
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
              key: 'sentence',
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
              key: 'distribution',
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
              key: 'execution',
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
              key: 'causeValue',
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
              key: 'request',
              type: 'input',
              className: 'p-col-12 p-md-12',
              props: {
                label: 'Pedido',
                placeholder: 'Descreva um pedido',
                required: true,
              }
            },
            {
              key: 'note',
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
              key: 'justiceSecret',
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
              key: 'captureProcedures',
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

  localProceduralNumberList = Array.from({ length: 99 }, (_, i) => {
    const value = `${i.toString().padStart(2, '0')}`;
    const nome = `${i.toString().padStart(2, '0')} °-°`;
    return { label: nome, value: value };
  });

  siglasUF = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO',
    'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI',
    'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
  ];

  estados = this.siglasUF.map(uf => ({ label: uf, value: uf }));

  async loadLists(): Promise<void> {
    const result = await firstValueFrom(
      forkJoin({
        actionObjectList: this.actionObjectService.getObjectActions(100, 0, true),
        groupProcessList: this.groupProcessService.getProcessGroups(100, 0, true),
        freeField1List: this.freeField2Service.getProcessFreeField1s(100, 0, true),
        freeField2List: this.freeField2Service.getProcessFreeField2s(100, 0, true),
        freeField6List: this.freeField2Service.getProcessFreeField6s(100, 0, true),
        practiceAreaList: this.practiceAreaService.getPracticeAreas(100, 0, true),
        localProcedureNameList: this.localProcedureNameService.getLocalProcedures(100, 0, true),
        proceduralStatusList: this.proceduralStatusService.getProceduralStatuss(100, 0, true),
        prognosisList: this.prognosisService.getPrognosiss(100, 0, true),
        countyList: this.countyService.getCountys(100, 0, true),
        phaseList: this.phaseService.getPhases(100, 0, true),
        locatorList: this.locatorService.getLocators(100, 0, true),
        subjectList: this.subjectService.getSubjects(100, 0, true),
        detailList: this.detailService.getDetails(100, 0, true),
        partherList: this.partherService.getPartners(100, 0, true),
        originList: this.originService.getOrigins(100, 0, true),
        clientList: this.clientService.getCustomers(100, 0, true, 'individual'),
        responsibleList: this.responsibleService.getResponsibles(100, 0, true),
      })
    );

    this.actionObjectList = result.actionObjectList?.data;
    this.groupProcessList = result.groupProcessList?.data;
    this.freeField1List = result.freeField1List?.data;
    this.freeField2List = result.freeField2List?.data;
    this.freeField6List = result.freeField6List?.data;
    this.practiceAreaList = result.practiceAreaList?.data;
    this.localProcedureNameList = result.localProcedureNameList?.data;
    this.proceduralStatusList = result.proceduralStatusList?.data;
    this.prognosisList = result.prognosisList?.data;
    this.countyList = result.countyList?.data;
    this.phaseList = result.phaseList?.data;
    this.locatorList = result.locatorList?.data;
    this.subjectList = result.subjectList?.data;
    this.detailList = result.detailList?.data;
    this.partherList = result.partherList?.data;
    this.originList = result.originList?.data;
    this.clientList = result.clientList?.data;
    this.responsibleList = result.responsibleList?.data;
  }

  async onSubmit(model: any) {
    this.messageService.add({ severity: 'info', summary: 'Informação', detail: 'Dados sendo processados!' });
    try {
      if (this.tipoPessoa == 'judicial') {
          const requestIndentify = {
            clientCategory: 'JUD'
          }
          const responseIndenty: any = await this.processService.saveIdentifyCustomer(requestIndentify, 'identifier')
          console.log('identifier', responseIndenty)
          this.modelJudicial.processId = "JUD" + responseIndenty.value
          this.processService.saveProcess(this.modelJudicial, 'judicials')
        } else {
          const requestIndentify = {
            clientCategory: 'ADM'
          }
          const responseIndenty: any = await this.processService.saveIdentifyCustomer(requestIndentify, 'identifier')
          this.modelAdm.processId = "ADM" + responseIndenty.value
          this.processService.saveProcess(this.modelAdm, 'administrative')
        }
      this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Cliente cadastrado com sucesso!' });
      setTimeout(() => {
        this.router.navigate(['/admin/process']);
      }, 1000);
    } catch (error) {
      console.log('Erro ao salvar grupo de cliente', error);
      this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao salvar um grupo de cliente!' });
    }
  }

  async voltar() {
    this.router.navigate(['/admin/process']);
  }
}
