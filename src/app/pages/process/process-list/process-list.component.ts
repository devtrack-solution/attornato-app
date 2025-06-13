import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { PaginatorModule } from 'primeng/paginator';
import { TableModule } from 'primeng/table';
import { SweetAlertService, AlertIcon } from 'src/app/shared/service/sweet-alert.service';
import { SharedModule } from 'src/app/shared/shared.module';
import Swal from 'sweetalert2';
import { ProcessService } from '../service/process.service';
import { RadioButtonModule } from 'primeng/radiobutton';

@Component({
  selector: 'app-process-list',
  standalone: true,
  imports: [CommonModule, SharedModule, TableModule,
    PaginatorModule, ButtonModule, DialogModule, RadioButtonModule],
  templateUrl: './process-list.component.html',
  styleUrl: './process-list.component.scss'
})
export class ProcessListComponent implements OnInit {

  display: boolean = false
  processAdministrativoList: any
  processJudicialList: any
  @ViewChild('showUpdate') showUpdate: any;
  @ViewChild('showCreate', { static: false }) showCreate: any;
  private router = inject(Router);
  typeFilter: any = 'numeracao';
  tipoPessoa: 'judicial' | 'administrativo' = 'administrativo';
    @ViewChild('name') nameInput!: ElementRef;


  constructor(private readonly sweetAlertService: SweetAlertService, private processService: ProcessService) { }

  ngOnInit() {
    this.processService.getProcesss(100, 0, true, 'administrative').subscribe((processAdministrativoList: any) => {
      this.processAdministrativoList = processAdministrativoList;
    });
    this.processService.getProcesss(100, 0, true, 'judicials').subscribe((processJudicialList: any) => {
      this.processJudicialList = processJudicialList;
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

  async openEditProcess(process: any): Promise<void> {
    await this.showUpdate.openLg(process);
  }

  async openCreateProcess() {
    if (!this.showCreate) {
      console.error("showCreate não foi inicializado corretamente.");
      return;
    }

    await this.showCreate.openLg();
  }


  async deleteProcess(process: any) {
    await this.confirmForRemove(process.id);
  }

  async searchProcess(name: any) {
    this.processService.getProcessSearch(100, 0, true, 'administrative', name).subscribe((processAdministrativoList: any) => {
      this.processAdministrativoList = processAdministrativoList;
    });
    this.processService.getProcessSearch(100, 0, true, 'judicials', name).subscribe((processJudicialList: any) => {
      this.processJudicialList = processJudicialList;
    });
  }

  cleanFilter(): void {
    this.nameInput.nativeElement.value = ''; 
    this.ngOnInit()
  }

  async confirmForRemove(id: string): Promise<any> {
    this.sweetAlertService.confirmAlert({
      title: 'Deseja remover esse Processo?',
      text: 'Ao remover esse Processo, todo o acesso associado a ele serão removidos!',
      icon: AlertIcon.WARNING,
      confirmText: 'O Processo foi removido com sucesso!',
      cancellText: 'Os dados da Processo não foram excluidos!'
    }).then(async (willDelete) => {
      if (willDelete.dismiss) {
        Swal.fire('', 'Os dados do Processo não foram excluidos!', 'error');
      } else {
        try {
          await this.processService.deleteProcess(id)
          await Swal.fire('', 'O Processo foi removida com sucesso!', 'success');
          location.reload();
        } catch (e) {
          Swal.fire('', 'Os dados do Processo não foram excluidos!', 'error');
          console.error(e);
        }
      }
    });
  }

  async editar(process: any, type: any) {
    this.processService.setProcess(process, type)
    this.router.navigate(['/admin/process/edit']);
  }
}
