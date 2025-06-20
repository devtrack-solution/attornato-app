import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TableModule } from 'primeng/table';
import { AlertIcon, SweetAlertService } from 'src/app/shared/service/sweet-alert.service';
import { SharedModule } from 'src/app/shared/shared.module';
import Swal from 'sweetalert2';
import { ProcessGroupEditComponent } from '../process-group-edit/process-group-edit.component';
import { ProcessGroupNewComponent } from '../process-group-new/process-group-new.component';
import { PaginatorModule } from 'primeng/paginator';
import { ButtonModule } from 'primeng/button';
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
  @ViewChild('name') nameInput!: ElementRef;


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
      title: 'Deseja remover esse Grupo?',
      text: 'Ao remover esse Grupo, todo o acesso associado a ele serão removidos!',
      icon: AlertIcon.WARNING,
      confirmText: 'O Grupo foi removido com sucesso!',
      cancellText: 'Os dados da Grupo não foram modificados!'
    }).then(async (willDelete) => {
      if (willDelete.dismiss) {
        Swal.fire('', 'Os dados do Grupo não foram modificados!', 'error');
      } else {
        try {
          await this.processGroupsService.deleteProcessGroup(id)
          await Swal.fire('', 'O Grupo foi removida com sucesso!', 'success');
          location.reload();
        } catch (e) {
          Swal.fire('', 'Os dados do Grupo não foram modificados!', 'error');
          console.error(e);
        }
      }
    });
  }

  async filter(name: any): Promise<void> {
    this.processGroupsService.getSearchProcessGroups(100, 0, true, name).subscribe((processGroupList: any) => {
      this.processGroupList = processGroupList;
    });
  }


  cleanFilter(): void {
    this.nameInput.nativeElement.value = ''; 
    this.ngOnInit()
  }
}
