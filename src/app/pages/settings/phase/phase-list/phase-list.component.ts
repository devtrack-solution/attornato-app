import { Component, OnInit, ViewChild } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { PhaseEditComponent } from '../phase-edit/phase-edit.component';
import { PhaseNewComponent } from '../phase-new/phase-new.component';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { PaginatorModule } from 'primeng/paginator';
import { TableModule } from 'primeng/table';
import { PhaseNamespace } from 'src/app/shared/components/types/phase.type';
import { PhaseService } from '../service/phase.service';
import { SweetAlertService, AlertIcon } from 'src/app/shared/service/sweet-alert.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-phase-list',
  standalone: true,
  imports: [CommonModule, SharedModule, TableModule, PhaseEditComponent, PhaseNewComponent,
    PaginatorModule, ButtonModule, DialogModule],
  templateUrl: './phase-list.component.html',
  styleUrl: './phase-list.component.scss'
})
export class PhaseListComponent implements OnInit {

  display: boolean = false
  phaseList: PhaseNamespace.PhaseList | any
  @ViewChild('showUpdate') showUpdate: any;
  @ViewChild('showCreate', { static: false }) showCreate: any;


  constructor(private readonly sweetAlertService: SweetAlertService, private phaseService: PhaseService) { }

  ngOnInit() {
    this.phaseService.getPhases(100, 0, true).subscribe((phaseList: PhaseNamespace.PhaseList) => {
      this.phaseList = phaseList;
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

  async openEditPhase(phase: any): Promise<void> {
    await this.showUpdate.openLg(phase);
  }

  async openCreatePhase() {
    if (!this.showCreate) {
      console.error("showCreate não foi inicializado corretamente.");
      return;
    }

    await this.showCreate.openLg();
  }


  async deletePhase(phase: any) {
    await this.confirmForRemove(phase.id);
  }

  async confirmForRemove(id: string): Promise<any> {
    this.sweetAlertService.confirmAlert({
      title: 'Deseja remover essa Fase?',
      text: 'Ao remover essa Fase, todo o acesso associado a ele serão removidos!',
      icon: AlertIcon.WARNING,
      confirmText: 'A Fase foi removido com sucesso!',
      cancellText: 'Os dados da Fase não foram modificados!'
    }).then(async (willDelete) => {
      if (willDelete.dismiss) {
        Swal.fire('', 'Os dados da Fase não foram modificados!', 'error');
      } else {
        try {
          await this.phaseService.deletePhase(id)
          await Swal.fire('', 'A Fase foi removida com sucesso!', 'success');
          location.reload();
        } catch (e) {
          Swal.fire('', 'Os dados da Fase não foram modificados!', 'error');
          console.error(e);
        }
      }
    });
  }
}
