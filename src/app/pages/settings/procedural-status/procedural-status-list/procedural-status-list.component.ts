import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { ProceduralStatusNamespace } from 'src/app/shared/components/types/procedural-status.type';
import { ProceduralStatusService } from '../service/procedural-status.service';
import { AlertIcon, SweetAlertService } from 'src/app/shared/service/sweet-alert.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { PaginatorModule } from 'primeng/paginator';
import { TableModule } from 'primeng/table';
import { ProceduralStatusEditComponent } from '../procedural-status-edit/procedural-status-edit.component';
import { ProceduralStatusNewComponent } from '../procedural-status-new/procedural-status-new.component';

@Component({
  selector: 'app-procedural-status-list',
  standalone: true,
  imports: [CommonModule, SharedModule, TableModule, ProceduralStatusEditComponent, ProceduralStatusNewComponent,
    PaginatorModule, ButtonModule, DialogModule],
  templateUrl: './procedural-status-list.component.html',
  styleUrl: './procedural-status-list.component.scss'
})
export class ProceduralStatusListComponent implements OnInit {

  display: boolean = false
  proceduralStatusList: ProceduralStatusNamespace.ProceduralStatusList | any
  @ViewChild('showUpdate') showUpdate: any;
  @ViewChild('showCreate', { static: false }) showCreate: any;
  @ViewChild('name') nameInput!: ElementRef;


  constructor(private readonly sweetAlertService: SweetAlertService, private proceduralStatusService: ProceduralStatusService) { }

  ngOnInit() {
    this.proceduralStatusService.getProceduralStatuss(100, 0, true).subscribe((proceduralStatusList: ProceduralStatusNamespace.ProceduralStatusList) => {
      this.proceduralStatusList = proceduralStatusList;
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

  async openEditProceduralStatus(proceduralStatus: any): Promise<void> {
    await this.showUpdate.openLg(proceduralStatus);
  }

  async openCreateProceduralStatus() {
    if (!this.showCreate) {
      console.error("showCreate não foi inicializado corretamente.");
      return;
    }

    await this.showCreate.openLg();
  }


  async deleteProceduralStatus(proceduralStatus: any) {
    await this.confirmForRemove(proceduralStatus.id);
  }

  async confirmForRemove(id: string): Promise<any> {
    this.sweetAlertService.confirmAlert({
      title: 'Deseja remover esse Stautus Processual?',
      text: 'Ao remover esse Stautus Processual, todo o acesso associado a ele serão removidos!',
      icon: AlertIcon.WARNING,
      confirmText: 'O Stautus Processual foi removido com sucesso!',
      cancellText: 'Os dados da Stautus Processual não foram modificados!'
    }).then(async (willDelete) => {
      if (willDelete.dismiss) {
        Swal.fire('', 'Os dados do Stautus Processual não foram modificados!', 'error');
      } else {
        try {
          await this.proceduralStatusService.deleteProceduralStatus(id)
          await Swal.fire('', 'O Stautus Processual foi removida com sucesso!', 'success');
          location.reload();
        } catch (e) {
          Swal.fire('', 'Os dados do Stautus Processual não foram modificados!', 'error');
          console.error(e);
        }
      }
    });
  }

  async filter(name: any): Promise<void> {
    this.proceduralStatusService.getSearchProceduralStatuss(100, 0, true, name).subscribe((proceduralStatusList: any) => {
      this.proceduralStatusList = proceduralStatusList;
    });
  }


  cleanFilter(): void {
    this.nameInput.nativeElement.value = '';
    this.ngOnInit()
  }
}
