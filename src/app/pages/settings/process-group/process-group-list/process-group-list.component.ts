import { CommonModule, NgClass, NgStyle } from '@angular/common';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TableModule } from 'primeng/table';
import { AlertIcon, SweetAlertService } from 'src/app/shared/service/sweet-alert.service';
import { SharedModule } from 'src/app/shared/shared.module';
import Swal from 'sweetalert2';
import { ProcessGroupEditComponent } from '../process-group-edit/process-group-edit.component';
import { ProcessGroupNewComponent } from '../process-group-new/process-group-new.component';
import { PaginatorModule } from 'primeng/paginator';
import { ButtonModule } from 'primeng/button';
import { ConfirmationService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { ProcessGroupService } from '../service/process-group.serivce';
import { ProcessGroupNamespace } from 'src/app/shared/components/types/process-group.type';

@Component({
  selector: 'app-process-group-list',
  standalone: true,
  imports: [CommonModule, SharedModule, TableModule, ProcessGroupEditComponent, ProcessGroupNewComponent,
    PaginatorModule, ButtonModule, DialogModule
  ],
  templateUrl: './process-group-list.component.html',
  styleUrl: './process-group-list.component.scss'
})
export class ProcessGroupListComponent implements OnInit {

  display: boolean = false
  processGroupList: ProcessGroupNamespace.ProcessGroupList | any
  @ViewChild('showUpdate') showUpdate: any;
  @ViewChild('showCreate', { static: false }) showCreate: any;
  private router = inject(Router);


  constructor(private readonly sweetAlertService: SweetAlertService, private processGroupsService: ProcessGroupService) { }

  ngOnInit() {
    this.processGroupsService.getProcessGroups(100, 0, true).subscribe((processGroupList: ProcessGroupNamespace.ProcessGroupList) => {
      this.processGroupList = processGroupList;
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

  async openEditProcessGroup(process: any): Promise<void> {
    await this.showUpdate.openLg(process);
  }

  async openCreateProcessGroup() {
    if (!this.showCreate) {
      console.error("showCreate não foi inicializado corretamente.");
      return;
    }

    await this.showCreate.openLg();
  }


  async deleteProcessGroup(process: any) {
    await this.confirmForRemove(process.id);
  }

  async confirmForRemove(id: string): Promise<any> {
    this.sweetAlertService.confirmAlert({
      title: 'Deseja remover essa Máquina?',
      text: 'Ao remover esse Máquina, todo o acesso associado a ele serão removidos!',
      icon: AlertIcon.WARNING,
      confirmText: 'A Máquina foi removido com sucesso!',
      cancellText: 'Os dados da Máquina não foram modificados!'
    }).then(async (willDelete) => {
      if (willDelete.dismiss) {
        Swal.fire('', 'Os dados da Máquina não foram modificados!', 'error');
      } else {
        try {
          await this.processGroupsService.deleteProcessGroup(id)
          await Swal.fire('', 'A Máquina foi removida com sucesso!', 'success');
          location.reload();
        } catch (e) {
          Swal.fire('', 'Os dados da Máquina não foram modificados!', 'error');
          console.error(e);
        }
      }
    });
  }
}
