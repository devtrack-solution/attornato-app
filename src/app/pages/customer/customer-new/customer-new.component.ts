import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FormlyFieldConfig, FormlyFormOptions, FormlyModule } from '@ngx-formly/core';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SharedModule } from 'src/app/shared/shared.module';
import { CustomersGroupService } from '../../settings/customers-group/service/customers-group.service';
import { ContactTypeService } from '../../settings/contact-types/service/contact-types.service';
import { FreeField2Service } from '../../settings/free-field2/service/free-field2.service';
import { firstValueFrom, forkJoin } from 'rxjs';
import { CustomerService } from '../service/customer.service';
import { ProfileService } from '../../settings/profile/service/profile.service';

@Component({
  selector: 'app-customer-new',
  standalone: true,
  imports: [FormlyModule, FormsModule, SharedModule, CommonModule, ButtonModule,
    RadioButtonModule, FormlyModule,
  ],
  templateUrl: './customer-new.component.html',
  styleUrl: './customer-new.component.scss'
})
export class CustomerNewComponent implements OnInit {

  formFisica = new FormGroup({});
  formJuridico = new FormGroup({});
  options: FormlyFormOptions = {};
  modelFisica: any = {};
  modelJuridico: any = {}
  fieldsFisica: FormlyFieldConfig[] | any;
  fieldsJuridica: FormlyFieldConfig[] | any;
  fieldsCustomer: FormlyFieldConfig[] | any;
  private router = inject(Router);
  @ViewChild('showConfirm') showConfirm: any;
  customerService = inject(CustomerService)
  groupCustomerService = inject(CustomersGroupService)
  profileService = inject(ProfileService)
  communicationChannelService = inject(ContactTypeService)
  freeFieldService = inject(FreeField2Service)
  tipoPessoa: 'fisica' | 'juridica' = 'fisica';
  communationChannelList: any = []
  profileList: any = []
  customersGroupList: any = []
  freeFieldList: any = []

  constructor(private messageService: MessageService) {

  }

  message: string = '';

  async ngOnInit(): Promise<void> {
    await this.loadLists();
    this.populatePessoaFisica();
    this.populatePessoaJuridica();
  }

  populatePessoaJuridica() {
    this.fieldsJuridica = [
      {
        type: 'stepper',
        fieldGroup: [
          {
            props: { label: 'Dados Inicial' },
            fieldGroupClassName: 'p-grid p-fluid',
            fieldGroup: [

              {
                key: 'groupCustomerId',
                type: 'select',
                className: 'p-col-12 p-md-3',
                props: {
                  label: 'Grupo de Cliente',
                  placeholder: 'Escolha o grupo',
                  required: false,
                  options: this.customersGroupList,
                  labelProp: 'name',
                  valueProp: 'id'
                }
              },
              {
                key: 'responsible',
                type: 'input',
                className: 'p-col-12 p-md-6',
                props: {
                  label: 'Responsável',
                  placeholder: 'Informe o responsável',
                  required: true,
                }
              },
              {
                key: 'profileId',
                type: 'select',
                className: 'p-col-12 p-md-3',
                props: {
                  label: 'Perfil',
                  placeholder: 'Escolha o perfil',
                  required: true,
                  attributes: {
                    autocomplete: 'off'
                  },
                  options: this.profileList,
                  labelProp: 'name',
                  valueProp: 'id'
                }
              },
              {
                key: 'companyName',
                type: 'input',
                className: 'p-col-12 p-md-4',
                props: {
                  label: 'Nome da Empresa',
                  placeholder: 'Informe o nome da empresa',
                  required: true,
                }
              },
              {
                key: 'tradeName',
                type: 'input',
                className: 'p-col-12 p-md-4',
                props: {
                  label: 'Nome Comercial',
                  placeholder: 'Informe o nome comercial',
                  required: true,
                }
              },
              {
                key: 'businessArea',
                type: 'input',
                className: 'p-col-12 p-md-4',
                props: {
                  label: 'Área de Negócio',
                  placeholder: 'Informe a área de negócio',
                  required: true,
                }
              },
              {
                key: 'cnpj',
                type: 'input',
                className: 'p-col-12 p-md-4',
                props: {
                  label: 'CNPJ',
                  placeholder: 'Informe o cnpj',
                  required: true,
                }
              },
              {
                key: 'stateRegistration',
                type: 'input',
                className: 'p-col-12 p-md-4',
                props: {
                  label: 'Registro Estadual',
                  placeholder: 'Informe o registro estadual',
                  required: true,
                }
              },
              {
                key: 'municipalRegistration',
                type: 'input',
                className: 'p-col-12 p-md-4',
                props: {
                  label: 'Registro Municipal',
                  placeholder: 'Informe o registor municipal',
                  required: true,
                }
              },
            ]
          },
          {
            props: { label: 'Endereço / Contato' },
            key: 'person.communicationAddress',
            fieldGroupClassName: 'p-grid p-fluid',
            fieldGroup: [
              {
                key: 'zipCode',
                type: 'input',
                className: 'p-col-12 p-md-3',
                props: {
                  label: 'Cep',
                  placeholder: 'Informe o cep',
                  required: true
                }
              },
              {
                key: 'street',
                type: 'input',
                className: 'p-col-12 p-md-6',
                props: {
                  label: 'Endereço',
                  placeholder: 'Informe o endereço',
                  required: true,
                  min: 0
                }
              },
              {
                key: 'neighborhood',
                type: 'input',
                className: 'p-col-12 p-md-3',
                props: {
                  label: 'Bairro',
                  placeholder: 'Informe o bairro',
                  required: false
                }
              },
              {
                key: 'city',
                type: 'input',
                className: 'p-col-12 p-md-3',
                props: {
                  label: 'Cidade',
                  placeholder: 'Informe a cidade',
                  required: false
                }
              },
              {
                key: 'state',
                type: 'select',
                className: 'p-col-12 p-md-3',
                props: {
                  label: 'Estado',
                  placeholder: 'Escolha o estado',
                  required: false,
                  attributes: {
                    autocomplete: 'off'
                  },
                  options: this.estados,
                  labelProp: 'label',
                  valueProp: 'value'
                }
              },
              {
                key: 'contacts',
                type: 'repeat',
                className: 'p-col-12 p-md-12',
                props: {
                  label: 'Adicionar Contato *',
                  required: true
                },
                fieldArray: {
                  fieldGroupClassName: 'p-grid',
                  fieldGroup: [
                    {
                      key: 'communicationChannelId',
                      type: 'select',
                      className: 'p-col-12 p-md-6',
                      props: {
                        label: 'Tipo de Contato',
                        placeholder: 'Escolha o Tipo de contato',
                        required: true,
                        attributes: {
                          autocomplete: 'off'
                        },
                        options: this.communationChannelList,
                        labelProp: 'name',
                        valueProp: 'id'
                      }
                    },
                    {
                      key: 'value',
                      type: 'input',
                      className: 'p-col-12 p-md-6',
                      props: {
                        label: 'Contato',
                        placeholder: 'Informe o contato',
                        required: true,
                        attributes: {
                          autocomplete: 'off'
                        }
                      }
                    }
                  ]
                }
              }
            ]
          },
          {
            props: { label: 'Pessoas Para Contato' },
            key: 'person.contactPerson',
            fieldGroupClassName: 'p-grid p-fluid',
            fieldGroup: [
              {
                key: 'phoneNumber',
                type: 'input',
                className: 'p-col-12 p-md-2',
                props: {
                  label: 'Telefone',
                  placeholder: 'Informe o telefone',
                  required: false,
                }
              },
              {
                key: 'mobilePhone',
                type: 'input',
                className: 'p-col-12 p-md-2',
                props: {
                  label: 'Celular',
                  placeholder: 'Informe o telefone celular',
                  required: false,
                }
              },
              {
                key: 'fatherName',
                type: 'input',
                className: 'p-col-12 p-md-4',
                props: {
                  label: 'Nome do Pai',
                  placeholder: 'Informe o nome do pai',
                  required: false,
                }
              },
              {
                key: 'motherName',
                type: 'input',
                className: 'p-col-12 p-md-4',
                props: {
                  label: 'Nome da Mãe',
                  placeholder: 'Informe o nome da mãe',
                  required: false,
                }
              },
              {
                key: 'freeFieldOne',
                type: 'input',
                className: 'p-col-12 p-md-6',
                props: {
                  label: 'Campo Livre',
                  placeholder: 'Informe uma breve descrição',
                  required: true,
                  min: 0
                }
              },
              {
                key: 'freeFieldId',
                type: 'select',
                className: 'p-col-12 p-md-6',
                props: {
                  label: 'Campo Livre 2',
                  placeholder: 'Escolha uma opção',
                  required: true,
                  attributes: {
                    autocomplete: 'off'
                  },
                  options: this.freeFieldList,
                  labelProp: 'name',
                  valueProp: 'id'
                }
              },
              {
                key: 'note',
                type: 'input',
                className: 'p-col-12 p-md-12',
                props: {
                  label: 'Nota',
                  placeholder: 'Informe uma breve descrição',
                  required: true,
                  min: 0
                }
              }
            ]
          }
        ]
      }
    ]
  }

  populatePessoaFisica() {
    this.fieldsFisica = [
      {
        type: 'stepper',
        fieldGroup: [
          {
            props: { label: 'Dados Inicial' },
            fieldGroupClassName: 'p-grid p-fluid',
            fieldGroup: [

              {
                key: 'groupCustomerId',
                type: 'select',
                className: 'p-col-12 p-md-3',
                props: {
                  label: 'Grupo de Cliente',
                  placeholder: 'Escolha o grupo',
                  required: true,
                  attributes: {
                    autocomplete: 'off'
                  },
                  options: this.customersGroupList,
                  labelProp: 'name',
                  valueProp: 'id'
                }
              },
              {
                key: 'name',
                type: 'input',
                className: 'p-col-12 p-md-6',
                props: {
                  label: 'Nome',
                  placeholder: 'Informe o nome',
                  required: true,
                }
              },
              {
                key: 'profileId',
                type: 'select',
                className: 'p-col-12 p-md-3',
                props: {
                  label: 'Perfil',
                  placeholder: 'Escolha o perfil',
                  required: true,
                  attributes: {
                    autocomplete: 'off'
                  },
                  options: this.profileList,
                  labelProp: 'name',
                  valueProp: 'id'
                }
              },
              {
                key: 'birthDate',
                type: 'input',
                className: 'p-col-12 p-md-2',
                props: {
                  type: 'date',
                  label: 'Data Nascimento',
                  placeholder: 'Informe a data',
                  required: true,
                }
              },
              {
                key: 'occupation',
                type: 'input',
                className: 'p-col-12 p-md-4',
                props: {
                  label: 'Profissão',
                  placeholder: 'Informe a profissão',
                  required: true,
                }
              },
              {
                key: 'educationLevel',
                type: 'input',
                className: 'p-col-12 p-md-3',
                props: {
                  label: 'Escolaridade',
                  placeholder: 'Informe a escolaridade',
                  required: true,
                }
              },
              {
                key: 'maritalStatus',
                type: 'select',
                className: 'p-col-12 p-md-3',
                props: {
                  label: 'Estado Civil',
                  placeholder: 'Estado civil',
                  required: true,
                  attributes: {
                    autocomplete: 'off'
                  },
                  options: [{ label: 'Solteiro(a)', value: 'Solteiro(a)' },
                  { label: 'Casado(a)', value: 'Casado(a)' },
                  { label: 'Divorciado(a)', value: 'Divorciado(a)' },
                  { label: 'Viúvo(a)', value: 'Viúvo(a)' }
                  ],
                  labelProp: 'label',
                  valueProp: 'value'
                }
              },
              {
                key: 'nationality',
                type: 'input',
                className: 'p-col-12 p-md-3',
                props: {
                  label: 'Nacionalidade',
                  placeholder: 'Informe a nacionalidade',
                  required: true,
                }
              },
              {
                key: 'cpf',
                type: 'input',
                className: 'p-col-12 p-md-3',
                props: {
                  label: 'CPF',
                  placeholder: 'Informe o CPF',
                  required: true,
                }
              },
              {
                key: 'rg',
                type: 'input',
                className: 'p-col-12 p-md-3',
                props: {
                  label: 'RG',
                  placeholder: 'Informe o RG',
                  required: true,
                }
              },
              {
                key: 'pis',
                type: 'input',
                className: 'p-col-12 p-md-3',
                props: {
                  label: 'PIS',
                  placeholder: 'Informe o PIS',
                  required: true,
                }
              },
            ]
          },
          {
            props: { label: 'Endereço / Contato' },
            key: 'person.communicationAddress',
            fieldGroupClassName: 'p-grid p-fluid',
            fieldGroup: [
              {
                key: 'zipCode',
                type: 'input',
                className: 'p-col-12 p-md-3',
                props: {
                  label: 'Cep',
                  placeholder: 'Informe o cep',
                  required: true
                }
              },
              {
                key: 'street',
                type: 'input',
                className: 'p-col-12 p-md-6',
                props: {
                  label: 'Endereço',
                  placeholder: 'Informe o endereço',
                  required: true,
                  min: 0
                }
              },
              {
                key: 'neighborhood',
                type: 'input',
                className: 'p-col-12 p-md-3',
                props: {
                  label: 'Bairro',
                  placeholder: 'Informe o bairro',
                  required: true
                }
              },
              {
                key: 'city',
                type: 'input',
                className: 'p-col-12 p-md-3',
                props: {
                  label: 'Cidade',
                  placeholder: 'Informe a cidade',
                  required: true
                }
              },
              {
                key: 'state',
                type: 'select',
                className: 'p-col-12 p-md-3',
                props: {
                  label: 'Estado',
                  placeholder: 'Escolha o estado',
                  required: false,
                  attributes: {
                    autocomplete: 'off'
                  },
                  options: this.estados,
                  labelProp: 'label',
                  valueProp: 'value'
                }
              },
              {
                key: 'contacts',
                type: 'repeat',
                className: 'p-col-12 p-md-12',
                props: {
                  label: 'Adicionar Contato',
                  required: true
                },
                fieldArray: {
                  fieldGroupClassName: 'p-grid',
                  fieldGroup: [
                    {
                      key: 'communicationChannelId',
                      type: 'select',
                      className: 'p-col-12 p-md-6',
                      props: {
                        label: 'Tipo de Contato',
                        placeholder: 'Escolha o Tipo de contato',
                        required: true,
                        attributes: {
                          autocomplete: 'off'
                        },
                        options: this.communationChannelList,
                        labelProp: 'name',
                        valueProp: 'id'
                      }
                    },
                    {
                      key: 'value',
                      type: 'input',
                      className: 'p-col-12 p-md-6',
                      props: {
                        label: 'Contato',
                        placeholder: 'Informe o contato',
                        required: true,
                        attributes: {
                          autocomplete: 'off'
                        }
                      }
                    }
                  ]
                }
              }
            ]
          },
          {
            props: { label: 'Pessoas Para Contato' },
            key: 'person.contactPerson',
            fieldGroupClassName: 'p-grid',
            fieldGroup: [
              {
                key: 'phoneNumber',
                type: 'input',
                className: 'p-col-12 p-md-2',
                props: {
                  label: 'Telefone',
                  placeholder: 'Informe o telefone',
                  required: false,
                }
              },
              {
                key: 'mobilePhone',
                type: 'input',
                className: 'p-col-12 p-md-2',
                props: {
                  label: 'Celular',
                  placeholder: 'Informe o telefone celular',
                  required: false,
                }
              },
              {
                key: 'fatherName',
                type: 'input',
                className: 'p-col-12 p-md-4',
                props: {
                  label: 'Nome do Pai',
                  placeholder: 'Informe o nome do pai',
                  required: false,
                }
              },
              {
                key: 'motherName',
                type: 'input',
                className: 'p-col-12 p-md-4',
                props: {
                  label: 'Nome da Mãe',
                  placeholder: 'Informe o nome da mãe',
                  required: false,
                }
              },
              {
                key: 'freeFieldOne',
                type: 'input',
                className: 'p-col-12 p-md-6',
                props: {
                  label: 'Campo Livre',
                  placeholder: 'Informe uma breve descrição',
                  required: true,
                  min: 0
                }
              },
              {
                key: 'freeFieldId',
                type: 'select',
                className: 'p-col-12 p-md-6',
                props: {
                  label: 'Campo Livre 2',
                  placeholder: 'Escolha uma opção',
                  required: true,
                  attributes: {
                    autocomplete: 'off'
                  },
                  options: this.freeFieldList,
                  labelProp: 'name',
                  valueProp: 'id'
                }
              },
              {
                key: 'note',
                type: 'input',
                className: 'p-col-12 p-md-12',
                props: {
                  label: 'Observação',
                  placeholder: 'Informe uma breve descrição',
                  required: true,
                  min: 0
                }
              }
            ]
          }
        ]
      }
    ]
  }

  async onSubmit() {
    if (this.formFisica.valid || this.formJuridico.valid) {
      this.messageService.add({ severity: 'info', summary: 'Informação', detail: 'Dados sendo processados!' });
      try {
        if (this.tipoPessoa == 'juridica') {
          const requestIndentify = {
            clientCategory: 'PJ'
          }
          const responseIndenty: any = await this.customerService.saveIdentifyCustomer(requestIndentify, 'identifier')
          console.log('identifier', responseIndenty)
          this.modelJuridico.person.clientId = "PJ" + responseIndenty.value
          this.customerService.saveCustomer(this.modelJuridico, 'legal')
        } else {
          const requestIndentify = {
            clientCategory: 'PF'
          }
          const responseIndenty: any = await this.customerService.saveIdentifyCustomer(requestIndentify, 'identifier')
          this.modelFisica.person.clientId = "PF" + responseIndenty.value
          this.customerService.saveCustomer(this.modelFisica, 'individual')
        }
        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Cliente cadastrado com sucesso!' });
        setTimeout(async () => {
          this.router.navigate(['/admin/customer']);
        }, 1000);
      } catch (error) {
        console.log('Erro ao salvar grupo de cliente', error);
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao salvar um grupo de cliente!' });
      }
    } else {
      console.warn('Formulário inválido');
    }

  }

  siglasUF = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO',
    'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI',
    'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
  ];

  estados = this.siglasUF.map(uf => ({ label: uf, value: uf }));



  async voltar(): Promise<void> {
    this.router.navigate(['/admin/customer']);
  }

  async loadLists(): Promise<void> {
    try {
      const result = await firstValueFrom(
        forkJoin({
          contactTypes: this.communicationChannelService.getContactTypes(100, 0, true),
          customersGroups: this.groupCustomerService.getCustomersGroups(100, 0, true),
          roles: this.profileService.getProfiles(100, 0, true),
          freeFields: this.freeFieldService.getClientFreeField2s(100, 0, true),
        })
      );

      this.communationChannelList = result.contactTypes?.data ?? [];
      this.customersGroupList = result.customersGroups?.data ?? [];
      this.profileList = result.roles?.data ?? [];
      this.freeFieldList = result.freeFields?.data ?? [];
    } catch (error) {
      console.error('Erro ao carregar as listas selects', error);
    }

  }
}
