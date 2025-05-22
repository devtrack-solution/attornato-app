import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { MessageService } from 'primeng/api';
import { RolesService } from '../../roles/service/roles.service';
import { PermissionService } from '../../permissions/service/permission.service';
import { firstValueFrom, forkJoin } from 'rxjs';
import { RoleService } from '../service/role.service';

@Component({
  selector: 'app-role-update',
  templateUrl: './role-update.component.html',
  styleUrls: ['./role-update.component.scss'],
})
export class RoleUpdateComponent implements OnInit {
  form = new FormGroup({});
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[] = [];

  sourcePermission: any[] = [];
  targetPermissions: any[] = [];
  model: any = {};
  message: any;
  permission: any[] = []

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private messageService: MessageService,
    private roleService: RoleService,
    private permissionService: PermissionService
  ) { }

  async ngOnInit() {
    this.model = this.roleService.getRole();
    this.roleService.clearRole();
    console.log('retorno', this.model)
    await this.loadPermissions()
    this.sourcePermission = this.filterPermission(this.permission, this.model?.permissions);
    this.targetPermissions = this.model?.permissions;
    this.fields = [
      {
        fieldGroupClassName: 'p-grid p-fluid',
        fieldGroup: [
          {
            key: 'name',
            type: 'input',
            className: 'p-col-12 p-md-4',
            props: {
              label: 'Nome',
              placeholder: 'Informe o nome',
              required: true,
              attributes: {
                autocomplete: 'off'
              }
            }
          },
          {
            key: 'description',
            type: 'input',
            className: 'p-col-12 p-md-4',
            props: {
              label: 'Descrição',
              placeholder: 'Informe a descrição',
              required: true,
              attributes: {
                autocomplete: 'off'
              }
            }
          },
          {
            key: 'level',
            type: 'input',
            className: 'p-col-12 p-md-4',
            props: {
              label: 'Level',
              placeholder: 'Informe o level',
              required: true,
              attributes: {
                autocomplete: 'off'
              }
            }
          },
          {
            fieldGroupClassName: 'row',
            fieldGroup: [
              {
                className: 'p-col-12',
                type: 'pickList',
                key: 'permissions',
                props: {
                  label: 'Permissões',
                  source: this.sourcePermission,
                  target: this.targetPermissions,
                },
              },
            ]
          },
        ]
      }
    ]
  }

  async onSubmit(model: any): Promise<void> {
    this.form.setErrors({ 'invalid': true });
    try {
      model.permissions = this.targetPermissions.map((value: any) => {
        return value.id
      });

      if (this.targetPermissions.length > 0) {
        const response = {
          name: model.name,
          description: model.description,
          level: model.level,
          permissionIds: model.permissions
        }
        await this.roleService.ediRole(this.model.id, response)
        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Perfil atualizado com sucesso!' });

        setTimeout(async () => {
          await this.router.navigateByUrl('/admin/settings/roles')
        }, 1000);
      } else {
        this.form.setErrors(null);
        this.messageService.add({ severity: 'error', summary: 'Falha!', detail: 'É necessário selecionar uma permissão!' });
      }

    } catch (e) {
      this.form.setErrors(null);
      this.messageService.add({ severity: 'error', summary: 'Error no formulário!', detail: 'Dados incorretos!' });
    }
  }

  async cancelation() {
    await this.router.navigateByUrl('/admin/settings/roles');
  }

  filterPermission(sourcePermission: any[], targetPermissions: any) {
    const permissaoNaoSelecionada = [];
    const sourcePermissionId = this.listPermissionId(sourcePermission);
    const targetPermissionsId = this.listPermissionId(targetPermissions);

    for (var i = 0; i < sourcePermissionId.length; i++) {
      if (targetPermissionsId.indexOf(sourcePermissionId[i]) == -1) {
        permissaoNaoSelecionada.push(sourcePermission[i]);
      }
    }
    return permissaoNaoSelecionada;
  }

  listPermissionId(lista: string | any[]) {
    const array = [];
    for (let i = 0; i < lista?.length; i++) {
      array.push(lista[i].id);
    }
    return array;
  }

  async loadPermissions() {
    const result = await firstValueFrom(
      forkJoin({
        permissionList: this.permissionService.getPermissions(100, 0, true)
      })
    );

    this.permission = result.permissionList;
  }
}
