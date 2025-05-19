import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { MessageService } from 'primeng/api';
import { PermissionService } from '../service/permission.service';

@Component({
  selector: 'app-permission-create',
  templateUrl: './permission-create.component.html',
  styleUrls: ['./permission-create.component.scss'],
})
export class PermissionCreateComponent {
  form = new FormGroup({})
  options: FormlyFormOptions = {}
  model: any = {}
  roles = []
  fields: FormlyFieldConfig[] = []
  message: any;
  required: any;
  isHide: any;
  cidades: any[] = [];
  constructor(
    private readonly router: Router,
    private permissionService: PermissionService,
    private messageService: MessageService
  ) { }
  async ngOnInit() {

    this.fields = [
      {
        fieldGroupClassName: 'row',
        fieldGroup: [
          //nome
          {
            key: 'name',
            type: 'input',
            className: 'col-12 col-md-6',
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
            className: 'col-12 col-md-6',
            props: {
              label: 'Descrição',
              placeholder: 'Informe a descrição',
              required: true,
              attributes: {
                autocomplete: 'off'
              }
            }
          },
        ],
      }
    ]
  }


  async onSubmit(model: any): Promise<void> {
    this.form.setErrors({ 'invalid': true });
    try {
      await this.permissionService.savePermission(this.model)
      this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Permissão criada com sucesso!' });

      setTimeout(async () => {
        await this.router.navigateByUrl('/admin/settings/permissions')
      }, 2000);
    } catch (e) {
      this.form.setErrors(null);
      this.messageService.add({ severity: 'error', summary: 'Error no formulário!', detail: 'Dados incorretos!' });
    }
  }

  async cancelation() {
    await this.router.navigateByUrl('/admin/settings/permissions')
  }
}
