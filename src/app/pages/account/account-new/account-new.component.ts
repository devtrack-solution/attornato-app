import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FormlyFieldConfig, FormlyFormOptions, FormlyModule } from '@ngx-formly/core';
import { MessageService } from 'primeng/api';
import { firstValueFrom, forkJoin } from 'rxjs';
import { AccountService } from '../service/account.service';
import { RoleService } from '../../settings/role/service/role.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { RadioButtonModule } from 'primeng/radiobutton';

@Component({
  selector: 'app-account-new',
  standalone: true,
  imports: [FormlyModule, FormsModule, SharedModule, CommonModule, ButtonModule,
    RadioButtonModule, FormlyModule],
  templateUrl: './account-new.component.html',
  styleUrl: './account-new.component.scss'
})
export class AccountNewComponent implements OnInit {

  form = new FormGroup({});
  options: FormlyFormOptions = {};
  model: any = {};
  fields: FormlyFieldConfig[] | any;
  private router = inject(Router);
  @ViewChild('showConfirm') showConfirm: any;
  accountService = inject(AccountService)
  rolesService = inject(RoleService)
  rolesList: any = []

  constructor(private messageService: MessageService) {

  }

  message: string = '';

  async ngOnInit(): Promise<void> {
    await this.loadLists();
    this.populateAccount();
  }

  populateAccount() {
    this.fields = [
      {
        fieldGroupClassName: 'p-grid p-fluid',
        fieldGroup: [

          {
            key: 'accountPerson.name',
            type: 'input',
            className: 'p-col-12 p-md-4',
            props: {
              label: 'Nome',
              placeholder: 'Informe o nome',
              required: true,
            }
          },
          {
            key: 'accountPerson.nickName',
            type: 'input',
            className: 'p-col-12 p-md-4',
            props: {
              label: 'Apelido',
              placeholder: 'Informe seu apelido',
              required: false,
            }
          },
          {
            key: 'accountPerson.birthday',
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
            key: 'accountPerson.gender',
            type: 'select',
            className: 'p-col-12 p-md-2',
            props: {
              label: 'Genêro',
              placeholder: 'Escolha seu genêro',
              required: true,
              attributes: {
                autocomplete: 'off'
              },
              options: [{ name: 'Masculino' }, { name: 'Feminino' }],
              labelProp: 'name',
              valueProp: 'name'
            }
          },
          {
            key: 'accountPerson.governanceSocialIdentity',
            type: 'input',
            className: 'p-col-12 p-md-4',
            props: {
              label: 'Identidade Social',
              placeholder: 'Informe a identidade social',
              required: false,
            }
          },
          {
            key: 'credential.username',
            type: 'input',
            className: 'p-col-12 p-md-4',
            props: {
              label: 'Username',
              placeholder: 'Informe seu e-mail',
              required: false,
            }
          },
          {
            key: 'credential.roleIds',
            type: 'mult-select',
            className: 'p-col-12 p-md-4',
            props: {
              label: 'Perfil',
              placeholder: 'Escolher os perfis',
              required: true,
              showFilter: true,
              labelProp: 'name',
              valueProp: 'id',
              options: this.rolesList
            }
          },
        ]
      },
    ]
  }

  async onSubmit() {
    if (this.form.valid) {
      this.messageService.add({ severity: 'info', summary: 'Informação', detail: 'Dados sendo processados!' });
      try {
        this.accountService.saveAccount(this.model)
        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Conta cadastrada com sucesso!' });
        setTimeout(async () => {
          this.router.navigate(['/admin/accounts']);
        }, 1000);
      } catch (error) {
        console.log('Erro ao salvar Conta', error);
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao salvar uma Conta!' });
      }
    } else {
      console.warn('Formulário inválido');
    }

  }

  async voltar(): Promise<void> {
    this.router.navigate(['/admin/accounts']);
  }

  async loadLists(): Promise<void> {
    try {
      const result = await firstValueFrom(
        forkJoin({
          roles: this.rolesService.getRoles(100, 0, true),
        })
      );

      this.rolesList = result?.roles?.data;
    } catch (error) {
      console.log(error)
    }
  }
}
