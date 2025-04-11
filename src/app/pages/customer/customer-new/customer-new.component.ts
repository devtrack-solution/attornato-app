import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FormlyFieldConfig, FormlyFormOptions, FormlyModule } from '@ngx-formly/core';
import { FormlyPrimeNGModule } from '@ngx-formly/primeng';
import { FormlyFormFieldModule } from '@ngx-formly/primeng/form-field';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CustomerService } from 'src/app/shared/service/customer.service';
import { SharedModule } from 'src/app/shared/shared.module';

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

  form = new FormGroup({});
  options: FormlyFormOptions = {};
  model: any = {};
  fieldsFisica: FormlyFieldConfig[] | any;
  fieldsJuridica: FormlyFieldConfig[] | any;
  fieldsCustomer: FormlyFieldConfig[] | any;
  private router = inject(Router);
  @ViewChild('showConfirm') showConfirm: any;
  customerService = inject(CustomerService)
  tipoPessoa: 'fisica' | 'juridica' = 'juridica';

  constructor(private messageService: MessageService){

  }

  message: string = '';

  ngOnInit(): void {
    this.populatePessoaFisica();
    this.populatePessoaJuridica();
  }

  populatePessoaJuridica(){
    this.fieldsJuridica = [
      {
        type: 'stepper',
        fieldGroup: [
          {
            props: { label: 'Dados Inicial' },
            fieldGroupClassName: 'p-grid p-fluid',
            fieldGroup: [
              
              {
                key: 'groupCustomers',
                type: 'select',
                className: 'p-col-12 p-md-3',
                templateOptions: {
                  label: 'Grupo de Cliente',
                  placeholder: 'Escolha o grupo',
                  required: true,
                  attributes: {
                    autocomplete: 'off'
                  },
                  options: [{ label: 'Grupo Cliente 01', value: 'Grupo Cliente 01' }],
                  labelProp: 'label',
                  valueProp: 'value'
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
                key: 'profile',
                type: 'select',
                className: 'p-col-12 p-md-3',
                props: {
                  label: 'Perfil',
                  placeholder: 'Escolha o perfil',
                  required: true,
                  attributes: {
                    autocomplete: 'off'
                  },
                  options: [{ label: 'Administrador', value: 'Administrador' },
                    { label: 'Criminal', value: 'Criminal' }
                  ],
                  labelProp: 'label',
                  valueProp: 'value'
                }
              },
              {
                key: 'companyName ',
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
            key: 'address',
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
                key: 'address',
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
                type: 'input',
                className: 'p-col-12 p-md-3',
                props: {
                  label: 'Estado',
                  placeholder: 'Informe o estado',
                  required: true,
                  min: 0
                }
              },
              {
                key: 'contact',
                type: 'repeat',
                className: 'p-col-12 p-md-12',
                props: {
                  label: 'Adicionar Contato',
                  required: false
                },
                fieldArray: {
                  fieldGroupClassName: 'p-grid',
                  fieldGroup: [
                    {
                      key: 'contactType',
                      type: 'select',
                      className: 'p-col-12 p-md-6',
                      props: {
                        label: 'Tipo de Contato',
                        placeholder: 'Escolha o Tipo de contato',
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
                      key: 'contact',
                      type: 'input',
                      className: 'p-col-12 p-md-6',
                      props: {
                        label: 'Contato',
                        placeholder: 'Informe o contato',
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
          },
          {
            props: { label: 'Pessoas Para Contato' },
            key: 'contactOther',
            fieldGroupClassName: 'p-grid p-fluid',
            fieldGroup: [
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
                  options: [{ label: 'Campo 01', value: 'Campo 01' }],
                  labelProp: 'label',
                  valueProp: 'value'
                }
              },
              {
                key: 'freefield',
                type: 'input',
                className: 'p-col-12 p-md-12',
                props: {
                  label: 'Campo Livre',
                  placeholder: 'Informe uma breve descrição',
                  required: true,
                  min: 0
                }
              },
              {
                key: 'contact',
                type: 'repeat',
                className: 'p-col-12 p-md-12',
                props: {
                  label: 'Adicionar Contato',
                  required: false
                },
                fieldArray: {
                  fieldGroupClassName: 'p-grid p-fluid',
                  fieldGroup: [
                    {
                      key: 'contactType',
                      type: 'select',
                      className: 'p-col-12 p-md-6',
                      props: {
                        label: 'Tipo de Contato',
                        placeholder: 'Escolha o Tipo de contato',
                        required: true,
                        attributes: {
                          autocomplete: 'off'
                        },
                        options: [{ label: 'Telefone', value: 'Telefone' },
                          { label: 'E-mail', value: 'E-mail' },
                          { label: 'Celular', value: 'Celular' }
                        ],
                        labelProp: 'label',
                        valueProp: 'value'
                      }
                    },
                    {
                      key: 'contact',
                      type: 'input',
                      className: 'p-col-12 p-md-6',
                      props: {
                        label: 'Contato',
                        placeholder: 'Informe o contato',
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

  populatePessoaFisica(){
    this.fieldsFisica = [
      {
        type: 'stepper',
        fieldGroup: [
          {
            props: { label: 'Dados Inicial' },
            fieldGroupClassName: 'p-grid p-fluid',
            fieldGroup: [
              
              {
                key: 'groupCustomers',
                type: 'select',
                className: 'p-col-12 p-md-3',
                props: {
                  label: 'Grupo de Cliente',
                  placeholder: 'Escolha o grupo',
                  required: true,
                  attributes: {
                    autocomplete: 'off'
                  },
                  options: [{ label: 'Grupo Cliente 01', value: 'Grupo Cliente 01' }],
                  labelProp: 'label',
                  valueProp: 'value'
                }
              },
              {
                key: 'nameCustomer',
                type: 'input',
                className: 'p-col-12 p-md-6',
                props: {
                  label: 'Nome',
                  placeholder: 'Informe o nome',
                  required: true,
                }
              },
              {
                key: 'profile',
                type: 'select',
                className: 'p-col-12 p-md-3',
                props: {
                  label: 'Perfil',
                  placeholder: 'Escolha o perfil',
                  required: true,
                  attributes: {
                    autocomplete: 'off'
                  },
                  options: [{ label: 'Perfil 01', value: 'Perfil 01' }],
                  labelProp: 'label',
                  valueProp: 'value'
                }
              },
              {
                key: 'profession',
                type: 'input',
                className: 'p-col-12 p-md-4',
                props: {
                  label: 'Profissão',
                  placeholder: 'Informe a profissão',
                  required: true,
                }
              },
              {
                key: 'schooling',
                type: 'input',
                className: 'p-col-12 p-md-4',
                props: {
                  label: 'Escolaridade',
                  placeholder: 'Informe a escolaridade',
                  required: true,
                }
              },
              {
                key: 'maritalStatus',
                type: 'select',
                className: 'p-col-12 p-md-4',
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
                key: 'cpf',
                type: 'input',
                className: 'p-col-12 p-md-4',
                props: {
                  label: 'CPF',
                  placeholder: 'Informe o CPF',
                  required: true,
                }
              },
              {
                key: 'rg',
                type: 'input',
                className: 'p-col-12 p-md-4',
                props: {
                  label: 'RG',
                  placeholder: 'Informe o RG',
                  required: true,
                }
              },
              {
                key: 'pis',
                type: 'input',
                className: 'p-col-12 p-md-4',
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
            key: 'address',
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
                key: 'address',
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
                type: 'input',
                className: 'p-col-12 p-md-3',
                props: {
                  label: 'Estado',
                  placeholder: 'Informe o estado',
                  required: true,
                  min: 0
                }
              },
              {
                key: 'contact',
                type: 'repeat',
                className: 'p-col-12 p-md-12',
                props: {
                  label: 'Adicionar Contato',
                  required: false
                },
                fieldArray: {
                  fieldGroupClassName: 'p-grid',
                  fieldGroup: [
                    {
                      key: 'contactType',
                      type: 'select',
                      className: 'p-col-12 p-md-6',
                      props: {
                        label: 'Tipo de Contato',
                        placeholder: 'Escolha o Tipo de contato',
                        required: true,
                        attributes: {
                          autocomplete: 'off'
                        },
                        options: [{ label: 'Telefone', value: 'Telefone' },
                          { label: 'E-mail', value: 'E-mail' },
                          { label: 'Celular', value: 'Celular' }],
                        labelProp: 'label',
                        valueProp: 'value'
                      }
                    },
                    {
                      key: 'contact',
                      type: 'input',
                      className: 'p-col-12 p-md-6',
                      props: {
                        label: 'Contato',
                        placeholder: 'Informe o contato',
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
          },
          {
            props: { label: 'Pessoas Para Contato' },
            key: 'contactOther',
            fieldGroupClassName: 'p-grid',
            fieldGroup: [
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
                  options: [{ label: 'Campo 01', value: 'Campo 01' }],
                  labelProp: 'label',
                  valueProp: 'value'
                }
              },
              {
                key: 'freefield',
                type: 'input',
                className: 'p-col-12 p-md-12',
                props: {
                  label: 'Campo Livre',
                  placeholder: 'Informe uma breve descrição',
                  required: true,
                  min: 0
                }
              },
              {
                key: 'contact',
                type: 'repeat',
                className: 'p-col-12 p-md-12',
                props: {
                  label: 'Adicionar Contato',
                  required: false
                },
                fieldArray: {
                  fieldGroupClassName: 'p-grid',
                  fieldGroup: [
                    {
                      key: 'contactType',
                      type: 'select',
                      className: 'p-col-12 p-md-6',
                      props: {
                        label: 'Tipo de Contato',
                        placeholder: 'Escolha o Tipo de contato',
                        required: true,
                        attributes: {
                          autocomplete: 'off'
                        },
                        options: [{ label: 'Telefone', value: 'Telefone' },
                          { label: 'E-mail', value: 'E-mail' },
                          { label: 'Celular', value: 'Celular' }],
                        labelProp: 'label',
                        valueProp: 'value'
                      }
                    },
                    {
                      key: 'contact',
                      type: 'input',
                      className: 'p-col-12 p-md-6',
                      props: {
                        label: 'Contato',
                        placeholder: 'Informe o contato',
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

  async onSubmit(model: any) {
    this.messageService.add({ severity: 'info', summary: 'Informação', detail: 'Dados sendo processados!' });
    try {
      this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Cliente cadastrado com sucesso!' });
      setTimeout(() => {
        this.router.navigate(['/admin/customer']);
      }, 1000);
    } catch (error) {
      console.log('Erro ao salvar grupo de cliente', error);
      this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao salvar um grupo de cliente!' });
    }
  }

  async voltar() {
    this.router.navigate(['/admin/customer']);
  }
}
