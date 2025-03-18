import { CommonModule } from '@angular/common';
import { Component, inject, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { PaginatorModule } from 'primeng/paginator';
import { TableModule } from 'primeng/table';
import { ProcessGroupNamespace } from 'src/app/shared/components/types/process-group.type';
import { SweetAlertService, AlertIcon } from 'src/app/shared/service/sweet-alert.service';
import { SharedModule } from 'src/app/shared/shared.module';
import Swal from 'sweetalert2';
import { CustomersGroupEditComponent } from '../customers-group-edit/customers-group-edit.component';
import { CustomersGroupNewComponent } from '../customers-group-new/customers-group-new.component';
import { CustomersGroupService } from '../service/customers-group.service';
import { CustomersGroupNamespace } from 'src/app/shared/components/types/customers-group.type';

@Component({
  selector: 'app-customers-group-list',
  standalone: true,
  imports: [CommonModule, SharedModule, TableModule, CustomersGroupEditComponent, CustomersGroupNewComponent,
      PaginatorModule, ButtonModule, DialogModule
  ],
  templateUrl: './customers-group-list.component.html',
  styleUrl: './customers-group-list.component.scss'
})
export class CustomersGroupListComponent {

  display: boolean = false
  customersGroupList: ProcessGroupNamespace.ProcessGroupList | any
  @ViewChild('showUpdate') showUpdate: any;
  @ViewChild('showCreate', { static: false }) showCreate: any;
  private router = inject(Router);


  constructor(private readonly sweetAlertService: SweetAlertService, private customersGroupsService: CustomersGroupService) { }

  ngOnInit() {
    this.customersGroupsService.getCustomersGroups(100, 0, true).subscribe((customersGroupList: CustomersGroupNamespace.CustomersGroupList) => {
      this.customersGroupList = customersGroupList;
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

  async openEditCustomersGroup(customers: any): Promise<void> {
    await this.showUpdate.openLg(customers);
  }

  async openCreateCustomersGroup() {
    if (!this.showCreate) {
      console.error("showCreate não foi inicializado corretamente.");
      return;
    }

    await this.showCreate.openLg();
  }


  async deleteCustomersGroup(customers: any) {
    await this.confirmForRemove(customers.id);
  }

  async confirmForRemove(id: string): Promise<any> {
    this.sweetAlertService.confirmAlert({
      title: 'Deseja remover esse Grupo?',
      text: 'Ao remover esse Grupo, todo o acesso associado a ele serão removidos!',
      icon: AlertIcon.WARNING,
      confirmText: 'O Grupo foi removido com sucesso!',
      cancellText: 'Os dados do Grupo não foram modificados!'
    }).then(async (willDelete) => {
      if (willDelete.dismiss) {
        Swal.fire('', 'Os dados do Grupo não foram modificados!', 'error');
      } else {
        try {
          await this.customersGroupsService.deleteCustomersGroup(id)
          await Swal.fire('', 'O Grupo foi removida com sucesso!', 'success');
          location.reload();
        } catch (e) {
          Swal.fire('', 'Os dados do Grupo não foram modificados!', 'error');
          console.error(e);
        }
      }
    });
  }
}
