import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertIcon, SweetAlertService } from 'src/app/shared/service/sweet-alert.service';
import Swal from 'sweetalert2';
import { PermissionService } from '../service/permission.service';

@Component({
  selector: 'app-permission-list',
  templateUrl: './permission-list.component.html',
  styleUrls: ['./permission-list.component.scss']
})
export class PermissionListComponent implements OnInit {
  display: boolean = false
  permissionsList: any
  @ViewChild('showUpdate') showUpdate: any;
  @ViewChild('showCreate', { static: false }) showCreate: any;
  private router = inject(Router);
  typeFilter: any = 'customers';
  tipoPessoa: 'fisica' | 'juridica' = 'fisica';
  @ViewChild('name') nameInput!: ElementRef;


  constructor(private readonly sweetAlertService: SweetAlertService, private permissionService: PermissionService) { }

  ngOnInit() {
    this.permissionService.getPermissions(100, 0, true).subscribe((permissionsList: any) => {
      this.permissionsList = permissionsList;
    });

  }
  rowClass(product: any): string {
    if (product.quantity === 0) {
      return 'out-of-stock';
    } else if (product.quantity <= 5) {
      return 'low-stock';
    } else {
      return 'in-stock';
    }
  }

  rowStyle(product: any): any {
    return { color: undefined };
    /*if (product.quantity === 0) {
      return { 'color': 'red' };
    } else if (product.quantity <= 5) {
      return { 'color': 'orange' };
    } else {
      return { 'color': 'green' };
    }*/
  }


  async deletePermission(role: any) {
    await this.confirmForRemove(role.id);
  }

  async confirmForRemove(id: string): Promise<any> {
    this.sweetAlertService.confirmAlert({
      title: 'Deseja remover essa Permissão?',
      text: 'Ao remover essa Permissão, todo o acesso associado a ele serão removidos!',
      icon: AlertIcon.WARNING,
      confirmText: 'A Permissão foi removido com sucesso!',
      cancellText: 'Os dados da Permissão não foram modificados!'
    }).then(async (willDelete) => {
      if (willDelete.dismiss) {
        Swal.fire('', 'Os dados da Permissão não foram modificados!', 'error');
      } else {
        try {
          await this.permissionService.deletePermission(id)
          await Swal.fire('', 'A Permissão foi removida com sucesso!', 'success');
          location.reload();
        } catch (e) {
          Swal.fire('', 'Os dados da Permissão não foram modificados!', 'error');
          console.error(e);
        }
      }
    });
  }

  async editar(permission: any) {
    this.permissionService.setPermission(permission)
    this.router.navigate(['/admin/settings/roles/edit']);
  }

  async visualizar(permission: any) {
    this.permissionService.setPermission(permission)
    this.router.navigate(['/admin/settings/roles/show']);
  }

  async filter(name: any): Promise<void> {
    this.permissionService.getSearchPermissions(100, 0, true, name).subscribe((permissionsList: any) => {
      this.permissionsList = permissionsList;
    });
  }


  cleanFilter(): void {
    this.nameInput.nativeElement.value = '';
    this.ngOnInit()
  }
}

