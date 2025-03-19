import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { PaginatorModule } from 'primeng/paginator';
import { TableModule } from 'primeng/table';
import { SharedModule } from 'src/app/shared/shared.module';
import { PartnerEditComponent } from '../partner-edit/partner-edit.component';
import { PartnerNewComponent } from '../partner-new/partner-new.component';
import { PartnerService } from '../service/partner.service';
import { AlertIcon, SweetAlertService } from 'src/app/shared/service/sweet-alert.service';
import { PartnerNamespace } from 'src/app/shared/components/types/partner.type';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-partner-list',
  standalone: true,
  imports: [CommonModule, SharedModule, TableModule, PartnerEditComponent, PartnerNewComponent,
    PaginatorModule, ButtonModule, DialogModule],
  templateUrl: './partner-list.component.html',
  styleUrl: './partner-list.component.scss'
})
export class PartnerListComponent implements OnInit {

  display: boolean = false
  partnerList: PartnerNamespace.PartnerList | any
  @ViewChild('showUpdate') showUpdate: any;
  @ViewChild('showCreate', { static: false }) showCreate: any;


  constructor(private readonly sweetAlertService: SweetAlertService, private partnerService: PartnerService) { }

  ngOnInit() {
    this.partnerService.getPartners(100, 0, true).subscribe((partnerList: PartnerNamespace.PartnerList) => {
      this.partnerList = partnerList;
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

  async openEditPartner(process: any): Promise<void> {
    await this.showUpdate.openLg(process);
  }

  async openCreatePartner() {
    if (!this.showCreate) {
      console.error("showCreate não foi inicializado corretamente.");
      return;
    }

    await this.showCreate.openLg();
  }


  async deletePartner(process: any) {
    await this.confirmForRemove(process.id);
  }

  async confirmForRemove(id: string): Promise<any> {
    this.sweetAlertService.confirmAlert({
      title: 'Deseja remover esse Parceiro?',
      text: 'Ao remover esse Parceiro, todo o acesso associado a ele serão removidos!',
      icon: AlertIcon.WARNING,
      confirmText: 'O Parceiro foi removido com sucesso!',
      cancellText: 'Os dados da Parceiro não foram modificados!'
    }).then(async (willDelete) => {
      if (willDelete.dismiss) {
        Swal.fire('', 'Os dados do Parceiro não foram modificados!', 'error');
      } else {
        try {
          await this.partnerService.deletePartner(id)
          await Swal.fire('', 'O Parceiro foi removida com sucesso!', 'success');
          location.reload();
        } catch (e) {
          Swal.fire('', 'Os dados do Parceiro não foram modificados!', 'error');
          console.error(e);
        }
      }
    });
  }
}
