import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { RolesService } from '../service/roles.service';
import { AlertIcon, SweetAlertService } from 'src/app/shared/service/sweet-alert.service';
import { RolesNamespace } from 'src/app/shared/components/types/roles.type';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { PaginatorModule } from 'primeng/paginator';
import { TableModule } from 'primeng/table';
import Swal from 'sweetalert2';
import { RolesEditComponent } from '../roles-edit/roles-edit.component';
import { RolesNewComponent } from '../roles-new/roles-new.component';

@Component({
  selector: 'app-roles-list',
  standalone: true,
  imports: [CommonModule, SharedModule, TableModule, RolesEditComponent, RolesNewComponent,
      PaginatorModule, ButtonModule, DialogModule],
  templateUrl: './roles-list.component.html',
  styleUrl: './roles-list.component.scss'
})
export class RolesListComponent implements OnInit {

  display: boolean = false
  rolesList: RolesNamespace.RolesList | any
  @ViewChild('showUpdate') showUpdate: any;
  @ViewChild('showCreate', { static: false }) showCreate: any;
  private router = inject(Router);


  constructor(private readonly sweetAlertService: SweetAlertService, private rolesService: RolesService) { }

  ngOnInit() {
    this.rolesService.geRoles(100, 0, true).subscribe((rolesList: RolesNamespace.RolesList) => {
      this.rolesList = rolesList;
    });
  }

  ngAfterViewInit() {
    console.log("showCreate:", this.showCreate); // Verifique se a referência está sendo capturada corretamente
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

  async openEditRoles(process: any): Promise<void> {
    await this.showUpdate.openLg(process);
  }

  async openCreateRoles() {
    if (!this.showCreate) {
      console.error("showCreate não foi inicializado corretamente.");
      return;
    }

    await this.showCreate.openLg();
  }


  async deleteRoles(process: any) {
    await this.confirmForRemove(process.id);
  }

  async confirmForRemove(id: string): Promise<any> {
    this.sweetAlertService.confirmAlert({
      title: 'Deseja remover esse Perfil?',
      text: 'Ao remover esse Perfil, todo o acesso associado a ele serão removidos!',
      icon: AlertIcon.WARNING,
      confirmText: 'O Perfil foi removido com sucesso!',
      cancellText: 'Os dados do Perfil não foram modificados!'
    }).then(async (willDelete) => {
      if (willDelete.dismiss) {
        Swal.fire('', 'Os dados do Perfil não foram modificados!', 'error');
      } else {
        try {
          await this.rolesService.deleteRole(id)
          await Swal.fire('', 'O Perfil foi removida com sucesso!', 'success');
          location.reload();
        } catch (e) {
          Swal.fire('', 'Os dados do Perfil não foram modificados!', 'error');
          console.error(e);
        }
      }
    });
  }
}
