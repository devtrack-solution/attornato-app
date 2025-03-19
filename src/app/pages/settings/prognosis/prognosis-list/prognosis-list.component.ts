import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { PaginatorModule } from 'primeng/paginator';
import { TableModule } from 'primeng/table';
import { SharedModule } from 'src/app/shared/shared.module';
import { PrognosisEditComponent } from '../prognosis-edit/prognosis-edit.component';
import { PrognosisNewComponent } from '../prognosis-new/prognosis-new.component';
import { PrognosisNamespace } from 'src/app/shared/components/types/prognosis.types';
import { Router } from '@angular/router';
import { SweetAlertService, AlertIcon } from 'src/app/shared/service/sweet-alert.service';
import Swal from 'sweetalert2';
import { PrognosisService } from '../service/prognosis.service';

@Component({
  selector: 'app-prognosis-list',
  standalone: true,
  imports: [CommonModule, SharedModule, TableModule, PrognosisEditComponent, PrognosisNewComponent,
    PaginatorModule, ButtonModule, DialogModule],
  templateUrl: './prognosis-list.component.html',
  styleUrl: './prognosis-list.component.scss'
})
export class PrognosisListComponent implements OnInit {

  display: boolean = false
  prognosisList: PrognosisNamespace.PrognosisList | any
  @ViewChild('showUpdate') showUpdate: any;
  @ViewChild('showCreate', { static: false }) showCreate: any;
  private router = inject(Router);


  constructor(private readonly sweetAlertService: SweetAlertService, private prognosisService: PrognosisService) { }

  ngOnInit() {
    this.prognosisService.getPrognosiss(100, 0, true).subscribe((prognosisList: PrognosisNamespace.PrognosisList) => {
      this.prognosisList = prognosisList;
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

  async openEditPrognosis(prognosis: any): Promise<void> {
    await this.showUpdate.openLg(prognosis);
  }

  async openCreatePrognosis() {
    if (!this.showCreate) {
      console.error("showCreate não foi inicializado corretamente.");
      return;
    }

    await this.showCreate.openLg();
  }


  async deletePrognosis(prognosis: any) {
    await this.confirmForRemove(prognosis.id);
  }

  async confirmForRemove(id: string): Promise<any> {
    this.sweetAlertService.confirmAlert({
      title: 'Deseja remover esse Prognóstico?',
      text: 'Ao remover esse Prognóstico, todo o acesso associado a ele serão removidos!',
      icon: AlertIcon.WARNING,
      confirmText: 'O Prognóstico foi removido com sucesso!',
      cancellText: 'Os dados da Prognóstico não foram modificados!'
    }).then(async (willDelete) => {
      if (willDelete.dismiss) {
        Swal.fire('', 'Os dados do Prognóstico não foram modificados!', 'error');
      } else {
        try {
          await this.prognosisService.deletePrognosis(id)
          await Swal.fire('', 'O Prognóstico foi removida com sucesso!', 'success');
          location.reload();
        } catch (e) {
          Swal.fire('', 'Os dados do Prognóstico não foram modificados!', 'error');
          console.error(e);
        }
      }
    });
  }
}
