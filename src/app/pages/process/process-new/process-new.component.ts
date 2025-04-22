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

@Component({
  selector: 'app-process-new',
  standalone: true,
  imports: [FormlyModule, FormsModule, SharedModule, CommonModule, ButtonModule,
    RadioButtonModule, FormlyModule,],
  templateUrl: './process-new.component.html',
  styleUrl: './process-new.component.scss'
})
export class ProcessNewComponent implements OnInit {

  form = new FormGroup({});
  options: FormlyFormOptions = {};
  model: any = {};
  fieldsAdministrativo: FormlyFieldConfig[] | any;
  fieldsJuridico: FormlyFieldConfig[] | any;
  fieldsCustomer: FormlyFieldConfig[] | any;
  private router = inject(Router);
  @ViewChild('showConfirm') showConfirm: any;
  processService = inject(ProcessService)
  tipoPessoa: 'administrativo' | 'juridico' = 'administrativo';

  constructor(private messageService: MessageService) {

  }

  message: string = '';

  ngOnInit(): void {
    this.populatePprocessoJuridico();
    this.populateProcessoAdministrativo();
  }

  populatePprocessoJuridico() {

    this.fieldsJuridico = [
      {
        fieldGroupClassName: 'p-grid p-fluid',
        fieldGroup: [
          {
            key: 'customersName',
            type: 'input',
            className: 'p-col-12 p-md-4',
            props: {
              label: 'Nome',
              placeholder: 'Informe o nome',
              required: true,
            }
          },
          {
            key: 'groupProcess',
            type: 'select',
            className: 'p-col-12 p-md-4',
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
            className: 'p-col-12 p-md-4',
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
            className: 'p-col-12 p-md-4',
            props: {
              label: 'N° Processo (Antigo)',
              placeholder: 'Informe o número do processo (antigo)',
              required: true,
            }
          },
          {
            key: 'nProcessCNJ',
            type: 'input',
            className: 'p-col-12 p-md-4',
            props: {
              label: 'N° Processo (CNJ)',
              placeholder: 'Informe o número do processo (cnj)',
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
          }
        ],
      }
    ]
  }

  populateProcessoAdministrativo() {
    this.fieldsAdministrativo = [
      {
        fieldGroupClassName: 'p-grid p-fluid',
        fieldGroup: [
          {
            key: 'customersName',
            type: 'input',
            className: 'p-col-12 p-md-4',
            props: {
              label: 'Nome',
              placeholder: 'Informe o nome',
              required: true,
            }
          },
          {
            key: 'groupProcess',
            type: 'select',
            className: 'p-col-12 p-md-4',
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
            className: 'p-col-12 p-md-4',
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
            className: 'p-col-12 p-md-4',
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
          }
        ],
      }
    ]
  }

  async onSubmit(model: any) {
    this.messageService.add({ severity: 'info', summary: 'Informação', detail: 'Dados sendo processados!' });
    try {
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
