import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { PaginatorModule } from 'primeng/paginator';
import { TableModule } from 'primeng/table';
import { SharedModule } from 'src/app/shared/shared.module';
import { ResponsibleEditComponent } from '../responsible-edit/responsible-edit.component';
import { ResponsibleNewComponent } from '../responsible-new/responsible-new.component';
import { ResponsibleNamespace } from 'src/app/shared/components/types/responsible.type';
import { ResponsibleService } from '../service/responsible.service';
import { AlertIcon, SweetAlertService } from 'src/app/shared/service/sweet-alert.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-responsible-list',
  standalone: true,
  imports: [CommonModule, SharedModule, TableModule, ResponsibleEditComponent, ResponsibleNewComponent,
    PaginatorModule, ButtonModule, DialogModule],
  templateUrl: './responsible-list.component.html',
  styleUrl: './responsible-list.component.scss'
})
export class ResponsibleListComponent implements OnInit {


  display: boolean = false
  responsibleList: ResponsibleNamespace.ResponsibleList | any
  @ViewChild('showUpdate') showUpdate: any;
  @ViewChild('showCreate', { static: false }) showCreate: any;


  constructor(private readonly sweetAlertService: SweetAlertService, private responsibleService: ResponsibleService) { }

  ngOnInit() {
    this.responsibleService.getResponsibles(100, 0, true).subscribe((responsibleList: ResponsibleNamespace.ResponsibleList) => {
      this.responsibleList = responsibleList;
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

  async openEditResponsible(responsible: any): Promise<void> {
    await this.showUpdate.openLg(responsible);
  }

  async openCreateResponsible() {
    if (!this.showCreate) {
      console.error("showCreate não foi inicializado corretamente.");
      return;
    }

    await this.showCreate.openLg();
  }


  async deleteResponsible(responsible: any) {
    await this.confirmForRemove(responsible.id);
  }

  async confirmForRemove(id: string): Promise<any> {
    this.sweetAlertService.confirmAlert({
      title: 'Deseja remover essa Responsável?',
      text: 'Ao remover essa Responsável, todo o acesso associado a ele serão removidos!',
      icon: AlertIcon.WARNING,
      confirmText: 'A Responsável foi removido com sucesso!',
      cancellText: 'Os dados da Responsável não foram modificados!'
    }).then(async (willDelete) => {
      if (willDelete.dismiss) {
        Swal.fire('', 'Os dados da Responsável não foram modificados!', 'error');
      } else {
        try {
          await this.responsibleService.deleteResponsible(id)
          await Swal.fire('', 'A Responsável foi removida com sucesso!', 'success');
          location.reload();
        } catch (e) {
          Swal.fire('', 'Os dados da Responsável não foram modificados!', 'error');
          console.error(e);
        }
      }
    });
  }
}
