import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { AlertIcon, SweetAlertService } from 'src/app/shared/service/sweet-alert.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { LocalProcedureNewComponent } from '../local-procedure-new/local-procedure-new.component';
import { LocalProcedureEditComponent } from '../local-procedure-edit/local-procedure-edit.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { PaginatorModule } from 'primeng/paginator';
import { TableModule } from 'primeng/table';
import Swal from 'sweetalert2';
import { LocalProcedureNamespace } from 'src/app/shared/components/types/local-procedure.type';
import { LocalProcedureService } from '../service/local-procedure.service';

@Component({
  selector: 'app-local-procedure-list',
  standalone: true,
  imports: [CommonModule, SharedModule, TableModule, LocalProcedureNewComponent, LocalProcedureEditComponent,
      PaginatorModule, ButtonModule, DialogModule
  ],
  templateUrl: './local-procedure-list.component.html',
  styleUrl: './local-procedure-list.component.scss'
})
export class LocalProcedureListComponent implements OnInit {

  display: boolean = false
  localProcedureList: LocalProcedureNamespace.LocalProcedureList | any
  @ViewChild('showUpdate') showUpdate: any;
  @ViewChild('showCreate', { static: false }) showCreate: any;
    @ViewChild('name') nameInput!: ElementRef;


  constructor(private readonly sweetAlertService: SweetAlertService, private localProcedureService: LocalProcedureService) { }

  ngOnInit() {
    this.localProcedureService.getLocalProcedures(100, 0, true).subscribe((localProcedureList: LocalProcedureNamespace.LocalProcedureList) => {
      this.localProcedureList = localProcedureList;
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

  async openEditLocalProcedure(process: any): Promise<void> {
    await this.showUpdate.openLg(process);
  }

  async openCreateLocalProcedure() {
    if (!this.showCreate) {
      console.error("showCreate não foi inicializado corretamente.");
      return;
    }

    await this.showCreate.openLg();
  }


  async deleteLocalProcedure(process: any) {
    await this.confirmForRemove(process.id);
  }

  async confirmForRemove(id: string): Promise<any> {
    this.sweetAlertService.confirmAlert({
      title: 'Deseja remover esse Local de Trâmite?',
      text: 'Ao remover esse Local de Trâmite, todo o acesso associado a ele serão removidos!',
      icon: AlertIcon.WARNING,
      confirmText: 'O Local de Trâmite foi removido com sucesso!',
      cancellText: 'Os dados da Local de Trâmite não foram modificados!'
    }).then(async (willDelete) => {
      if (willDelete.dismiss) {
        Swal.fire('', 'Os dados da Local de Trâmite não foram modificados!', 'error');
      } else {
        try {
          await this.localProcedureService.deleteLocalProcedure(id)
          await Swal.fire('', 'O Local de Trâmite foi removida com sucesso!', 'success');
          location.reload();
        } catch (e) {
          Swal.fire('', 'Os dados do Local de Trâmite não foram modificados!', 'error');
          console.error(e);
        }
      }
    });
  }

  async filter(name: any): Promise<void> {
    this.localProcedureService.getSearchLocalProcedures(100, 0, true, name).subscribe((localProcedureList: any) => {
      this.localProcedureList = localProcedureList;
    });
  }


  cleanFilter(): void {
    this.nameInput.nativeElement.value = ''; 
    this.ngOnInit()
  }
}
