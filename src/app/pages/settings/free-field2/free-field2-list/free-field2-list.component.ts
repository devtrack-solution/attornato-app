import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FreeField2Namespace } from 'src/app/shared/components/types/free-field2.type';
import { SweetAlertService, AlertIcon } from 'src/app/shared/service/sweet-alert.service';
import Swal from 'sweetalert2';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { PaginatorModule } from 'primeng/paginator';
import { TableModule } from 'primeng/table';
import { FreeField2EditComponent } from '../free-field2-edit/free-field2-edit.component';
import { FreeField2NewComponent } from '../free-field2-new/free-field2-new.component';
import { FreeField2Service } from '../service/free-field2.service';

@Component({
  selector: 'app-free-field2-list',
  standalone: true,
  imports: [CommonModule, SharedModule, TableModule, FreeField2EditComponent, FreeField2NewComponent,
    PaginatorModule, ButtonModule, DialogModule],
  templateUrl: './free-field2-list.component.html',
  styleUrl: './free-field2-list.component.scss'
})
export class FreeField2ListComponent implements OnInit {

  display: boolean = false
  freeField2List: FreeField2Namespace.FreeField2List | any
  @ViewChild('showUpdate') showUpdate: any;
  @ViewChild('showCreate', { static: false }) showCreate: any;
  @ViewChild('name') nameInput!: ElementRef;


  constructor(private readonly sweetAlertService: SweetAlertService, private freeField2Service: FreeField2Service) { }

  ngOnInit() {
    this.freeField2Service.getClientFreeField2s(100, 0, true).subscribe((freeField2List: FreeField2Namespace.FreeField2List) => {
      this.freeField2List = freeField2List;
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

  async openEditFreeField2(freeField: any): Promise<void> {
    await this.showUpdate.openLg(freeField);
  }

  async openCreateFreeField2() {
    if (!this.showCreate) {
      console.error("showCreate não foi inicializado corretamente.");
      return;
    }

    await this.showCreate.openLg();
  }


  async deleteFreeField2(freeField: any) {
    await this.confirmForRemove(freeField.id);
  }

  async confirmForRemove(id: string): Promise<any> {
    this.sweetAlertService.confirmAlert({
      title: 'Deseja remover esse Campo Livre?',
      text: 'Ao remover esse Campo Livre, todo o acesso associado a ele serão removidos!',
      icon: AlertIcon.WARNING,
      confirmText: 'O Campo Livre foi removido com sucesso!',
      cancellText: 'Os dados do Campo Livre não foram modificados!'
    }).then(async (willDelete) => {
      if (willDelete.dismiss) {
        Swal.fire('', 'Os dados do Campo Livre não foram modificados!', 'error');
      } else {
        try {
          await this.freeField2Service.deleteFreeField2(id)
          await Swal.fire('', 'O Campo Livre foi removida com sucesso!', 'success');
          location.reload();
        } catch (e) {
          Swal.fire('', 'Os dados do Campo Livre não foram modificados!', 'error');
          console.error(e);
        }
      }
    });
  }

  async filter(name: any): Promise<void> {
    this.freeField2Service.getSearchClientFreeField2s(100, 0, true, name).subscribe((freeField2List: any) => {
      this.freeField2List = freeField2List;
    });
  }


  cleanFilter(): void {
    this.nameInput.nativeElement.value = '';
    this.ngOnInit()
  }
}
