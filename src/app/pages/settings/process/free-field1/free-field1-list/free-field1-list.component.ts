import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { FreeField1NewComponent } from '../free-field1-new/free-field1-new.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { PaginatorModule } from 'primeng/paginator';
import { TableModule } from 'primeng/table';
import { SweetAlertService, AlertIcon } from 'src/app/shared/service/sweet-alert.service';
import Swal from 'sweetalert2';
import { FreeField1Service } from '../service/free-field1.service';
import { FreeField1EditComponent } from '../free-field1-edit/free-field1-edit.component';

@Component({
  selector: 'app-free-field1-list',
  standalone: true,
  imports: [CommonModule, SharedModule, TableModule, FreeField1NewComponent, FreeField1EditComponent,
    PaginatorModule, ButtonModule, DialogModule],
  templateUrl: './free-field1-list.component.html',
  styleUrl: './free-field1-list.component.scss'
})
export class FreeField1ListComponent implements OnInit {

  display: boolean = false
  freeField1List: any
  @ViewChild('showUpdate') showUpdate: any;
  @ViewChild('showCreate', { static: false }) showCreate: any;
  @ViewChild('name') nameInput!: ElementRef;


  constructor(private readonly sweetAlertService: SweetAlertService, private freeField1Service: FreeField1Service) { }

  ngOnInit() {
    this.freeField1Service.getFreeField1s(100, 0, true).subscribe((freeField1List: any) => {
      this.freeField1List = freeField1List;
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

  async openEditFreeField1(freeField: any): Promise<void> {
    await this.showUpdate.openLg(freeField);
  }

  async openCreateFreeField1() {
    if (!this.showCreate) {
      console.error("showCreate não foi inicializado corretamente.");
      return;
    }

    await this.showCreate.openLg();
  }


  async deleteFreeField1(freeField: any) {
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
          await this.freeField1Service.deleteFreeField1(id)
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
    this.freeField1Service.getSearchFreeField1s(100, 0, true, name).subscribe((freeField1List: any) => {
      this.freeField1List = freeField1List;
    });
  }


  cleanFilter(): void {
    this.nameInput.nativeElement.value = '';
    this.ngOnInit()
  }
}
