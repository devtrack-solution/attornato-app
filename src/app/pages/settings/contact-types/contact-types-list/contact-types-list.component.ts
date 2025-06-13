import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { PaginatorModule } from 'primeng/paginator';
import { TableModule } from 'primeng/table';
import { ProcessGroupNamespace } from 'src/app/shared/components/types/process-group.type';
import { SweetAlertService, AlertIcon } from 'src/app/shared/service/sweet-alert.service';
import { SharedModule } from 'src/app/shared/shared.module';
import Swal from 'sweetalert2';
import { ContactTypesEditComponent } from '../contact-types-edit/contact-types-edit.component';
import { ContactTypesNewComponent } from '../contact-types-new/contact-types-new.component';
import { ContactTypeService } from '../service/contact-types.service';
import { ContactTypesNamespace } from 'src/app/shared/components/types/contact-types.type';

@Component({
  selector: 'app-contact-types-list',
  standalone: true,
  imports: [CommonModule, SharedModule, TableModule, ContactTypesEditComponent, ContactTypesNewComponent,
    PaginatorModule, ButtonModule, DialogModule],
  templateUrl: './contact-types-list.component.html',
  styleUrl: './contact-types-list.component.scss'
})
export class ContactTypesListComponent implements OnInit {

  display: boolean = false
  contactTypesList: ProcessGroupNamespace.ProcessGroupList | any
  @ViewChild('showUpdate') showUpdate: any;
  @ViewChild('showCreate', { static: false }) showCreate: any;
  @ViewChild('name') nameInput!: ElementRef;


  constructor(private readonly sweetAlertService: SweetAlertService, private contactTypesService: ContactTypeService) { }

  ngOnInit() {
    this.contactTypesService.getContactTypes(100, 0, true).subscribe((contactTypesList: ContactTypesNamespace.ContactTypesList) => {
      this.contactTypesList = contactTypesList;
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

  async openEditContactTypes(customers: any): Promise<void> {
    await this.showUpdate.openLg(customers);
  }

  async openCreateContactTypes() {
    if (!this.showCreate) {
      console.error("showCreate não foi inicializado corretamente.");
      return;
    }

    await this.showCreate.openLg();
  }


  async deleteContactTypes(customers: any) {
    await this.confirmForRemove(customers.id);
  }

  async confirmForRemove(id: string): Promise<any> {
    this.sweetAlertService.confirmAlert({
      title: 'Deseja remover esse Tipo de Contato?',
      text: 'Ao remover esse Tipo de Contato, todo o acesso associado a ele serão removidos!',
      icon: AlertIcon.WARNING,
      confirmText: 'O Tipo de Contato foi removido com sucesso!',
      cancellText: 'Os dados do Tipo de Contato não foram modificados!'
    }).then(async (willDelete) => {
      if (willDelete.dismiss) {
        Swal.fire('', 'Os dados do Tipo de Contato não foram modificados!', 'error');
      } else {
        try {
          await this.contactTypesService.deleteContactType(id)
          await Swal.fire('', 'O Tipo de Contato foi removida com sucesso!', 'success');
          location.reload();
        } catch (e) {
          Swal.fire('', 'Os dados do Tipo de Contato não foram modificados!', 'error');
          console.error(e);
        }
      }
    });
  }

  async filter(name: any): Promise<void> {
    this.contactTypesService.getSearchContactTypes(100, 0, true, name).subscribe((contactTypesList: any) => {
      this.contactTypesList = contactTypesList;
    });
  }


  cleanFilter(): void {
    this.nameInput.nativeElement.value = '';
    this.ngOnInit()
  }
}
