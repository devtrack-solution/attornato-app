import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { PaginatorModule } from 'primeng/paginator';
import { TableModule } from 'primeng/table';
import { SharedModule } from 'src/app/shared/shared.module';
import { DetailsEditComponent } from '../details-edit/details-edit.component';
import { DetailsNewComponent } from '../details-new/details-new.component';
import { DetailsService } from '../service/details.service';
import { DetailsNamespace } from 'src/app/shared/components/types/details-types';
import { AlertIcon, SweetAlertService } from 'src/app/shared/service/sweet-alert.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-details-list',
  standalone: true,
  imports: [CommonModule, SharedModule, TableModule, DetailsEditComponent, DetailsNewComponent,
    PaginatorModule, ButtonModule, DialogModule],
  templateUrl: './details-list.component.html',
  styleUrl: './details-list.component.scss'
})
export class DetailsListComponent implements OnInit {

  display: boolean = false
  detailsList: DetailsNamespace.DetailsList | any
  @ViewChild('showUpdate') showUpdate: any;
  @ViewChild('showCreate', { static: false }) showCreate: any;


  constructor(private readonly sweetAlertService: SweetAlertService, private detailsService: DetailsService) { }

  ngOnInit() {
    this.detailsService.getDetails(100, 0, true).subscribe((detailsList: DetailsNamespace.DetailsList) => {
      this.detailsList = detailsList;
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

  async openEditDetails(details: any): Promise<void> {
    await this.showUpdate.openLg(details);
  }

  async openCreateDetails() {
    if (!this.showCreate) {
      console.error("showCreate não foi inicializado corretamente.");
      return;
    }

    await this.showCreate.openLg();
  }


  async deleteDetails(details: any) {
    await this.confirmForRemove(details.id);
  }

  async confirmForRemove(id: string): Promise<any> {
    this.sweetAlertService.confirmAlert({
      title: 'Deseja remover esse Detalhe?',
      text: 'Ao remover esse Detalhe, todo o acesso associado a ele serão removidos!',
      icon: AlertIcon.WARNING,
      confirmText: 'O Detalhe foi removido com sucesso!',
      cancellText: 'Os dados da Detalhe não foram modificados!'
    }).then(async (willDelete) => {
      if (willDelete.dismiss) {
        Swal.fire('', 'Os dados do Detalhe não foram modificados!', 'error');
      } else {
        try {
          await this.detailsService.deleteDetail(id)
          await Swal.fire('', 'O Detalhe foi removida com sucesso!', 'success');
          location.reload();
        } catch (e) {
          Swal.fire('', 'Os dados do Detalhe não foram modificados!', 'error');
          console.error(e);
        }
      }
    });
  }
}
