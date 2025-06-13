import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { FreeField6Service } from '../service/free-field6.service';
import { Router } from '@angular/router';
import { SweetAlertService, AlertIcon } from 'src/app/shared/service/sweet-alert.service';
import Swal from 'sweetalert2';
import { FreeField6NewComponent } from '../free-field6-new/free-field6-new.component';
import { FreeField6EditComponent } from '../free-field6-edit/free-field6-edit.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { PaginatorModule } from 'primeng/paginator';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-free-field6-list',
  standalone: true,
  imports: [CommonModule, SharedModule, TableModule, FreeField6NewComponent, FreeField6EditComponent,
    PaginatorModule, ButtonModule, DialogModule],
  templateUrl: './free-field6-list.component.html',
  styleUrl: './free-field6-list.component.scss'
})
export class FreeField6ListComponent implements OnInit {

  display: boolean = false
  freeField6List: any
  @ViewChild('showUpdate') showUpdate: any;
  @ViewChild('showCreate', { static: false }) showCreate: any;
  @ViewChild('name') nameInput!: ElementRef;


  constructor(private readonly sweetAlertService: SweetAlertService, private freeField6Service: FreeField6Service) { }

  ngOnInit() {
    this.freeField6Service.getFreeField6s(100, 0, true).subscribe((freeField6List: any) => {
      this.freeField6List = freeField6List;
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

  async openEditFreeField6(freeField: any): Promise<void> {
    await this.showUpdate.openLg(freeField);
  }

  async openCreateFreeField6() {
    if (!this.showCreate) {
      console.error("showCreate não foi inicializado corretamente.");
      return;
    }

    await this.showCreate.openLg();
  }


  async deleteFreeField6(freeField: any) {
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
          await this.freeField6Service.deleteFreeField6(id)
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
    this.freeField6Service.getSearchFreeField6s(100, 0, true, name).subscribe((freeField6List: any) => {
      this.freeField6List = freeField6List;
    });
  }


  cleanFilter(): void {
    this.nameInput.nativeElement.value = '';
    this.ngOnInit()
  }
}
