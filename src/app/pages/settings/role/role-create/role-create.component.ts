import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { MessageService } from 'primeng/api';
import { PermissionService } from '../../permissions/service/permission.service';
import { firstValueFrom, forkJoin } from 'rxjs';
import { RoleService } from '../service/role.service';

@Component({
  selector: 'app-role-create',
  templateUrl: './role-create.component.html',
  styleUrls: ['./role-create.component.scss'],
})
export class RoleCreateComponent implements OnInit {
  form = new FormGroup({})
  options: FormlyFormOptions = {}
  fields: FormlyFieldConfig[] = []

  sourcePermission: any[] = []
  targetPermissions: any[] = []
  permission: any[] = [];
  permissionList: any[] = [];

  model = {
    permissions: null
  };
  message: any;

  constructor(
    private readonly router: Router,
    private messageService: MessageService,
    private permissionService: PermissionService,
    private roleService : RoleService
  ) {

  }

  async ngOnInit() {
    await this.loadPermissions();
    this.sourcePermission = this.permissionList;
    this.targetPermissions = [];
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
      this.removeColumnsTargetPermission(this.targetPermissions);
      model.permissions = this.permission;
      if (this.permission.length > 0) {
        const response = {
          name : model.name,
          description: model.description,
          level: model.level,
          permissions: model.permissions
        }
        await this.roleService.saveRole(response)
        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Perfil criado com sucesso!' });
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

  removeColumnsTargetPermission(permission: any) {
    this.permission = []
    if (permission.length > 0) {
      for (let index = 0; index < permission.length; index++) {
        this.permission.push(
          {
            'id': permission[index].id,
            'name': permission[index].name,
            'description': permission[index].description,
            'resource': permission[index].resource
          },
        )
      }
    } else {
      this.permission = [];
    }
  }
  async cancelation() {
    await this.router.navigateByUrl('/admin/settings/roles')
  }

  async loadPermissions() {
    const result = await firstValueFrom(
          forkJoin({
            permissionList: this.permissionService.getPermissions(100, 0, true)
          })
        );
    
        this.permissionList = result.permissionList;
  }
}
