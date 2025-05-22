import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AlertIcon, SweetAlertService } from 'src/app/shared/service/sweet-alert.service';
import { RoleService } from '../service/role.service';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.scss']
})
export class RoleListComponent implements OnInit {
  display: boolean = false
  rolesList: any
  @ViewChild('showUpdate') showUpdate: any;
  @ViewChild('showView', { static: false }) showView: any;
  private router = inject(Router);
  typeFilter: any = 'customers';
  tipoPessoa: 'fisica' | 'juridica' = 'fisica';


  constructor(private readonly sweetAlertService: SweetAlertService, private roleService: RoleService) { }

  ngOnInit() {
    this.roleService.getRoles(100, 0, true).subscribe((rolesList: any) => {
      this.rolesList = rolesList;
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


  async deleteRole(role: any) {
    await this.confirmForRemove(role.id);
  }

  async searchCustomers(name: any) {
    console.log('olha o nome', name)
  }

  async confirmForRemove(id: string): Promise<any> {
    this.sweetAlertService.confirmAlert({
      title: 'Deseja remover esse Perfil?',
      text: 'Ao remover esse Perfil, todo o acesso associado a ele serão removidos!',
      icon: AlertIcon.WARNING,
      confirmText: 'O Perfil foi removido com sucesso!',
      cancellText: 'Os dados da Perfil não foram modificados!'
    }).then(async (willDelete) => {
      if (willDelete.dismiss) {
        Swal.fire('', 'Os dados do Perfil não foram modificados!', 'error');
      } else {
        try {
          await this.roleService.deleteRole(id)
          await Swal.fire('', 'O Perfil foi removida com sucesso!', 'success');
          location.reload();
        } catch (e) {
          Swal.fire('', 'Os dados do Perfil não foram modificados!', 'error');
          console.error(e);
        }
      }
    });
  }

  async editar(role: any) {
    this.roleService.setRole(role)
    this.router.navigate(['/admin/settings/roles/edit']);
  }

  async visualizar(role: any) {
    await this.showView.openLg(role);
  }


  


}
