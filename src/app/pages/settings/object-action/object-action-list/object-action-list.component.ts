import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ObjectActionEditComponent } from '../object-action-edit/object-action-edit.component';
import { ObjectActionNewComponent } from '../object-action-new/object-action-new.component';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { PaginatorModule } from 'primeng/paginator';
import { TableModule } from 'primeng/table';
import { ObjectActionService } from '../service/object-action.service';
import { ObjectActionNamespace } from 'src/app/shared/components/types/object-action.type';
import { SweetAlertService, AlertIcon } from 'src/app/shared/service/sweet-alert.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-object-action-list',
  standalone: true,
  imports: [CommonModule, SharedModule, TableModule, ObjectActionEditComponent, ObjectActionNewComponent,
    PaginatorModule, ButtonModule, DialogModule],
  templateUrl: './object-action-list.component.html',
  styleUrl: './object-action-list.component.scss'
})
export class ObjectActionListComponent implements OnInit {

  display: boolean = false
  objectActionList: ObjectActionNamespace.ObjectActionList | any
  @ViewChild('showUpdate') showUpdate: any;
  @ViewChild('showCreate', { static: false }) showCreate: any;
  @ViewChild('name') nameInput!: ElementRef;


  constructor(private readonly sweetAlertService: SweetAlertService, private objectActiionService: ObjectActionService) { }

  ngOnInit() {
    this.objectActiionService.getObjectActions(100, 0, true).subscribe((objectActionList: ObjectActionNamespace.ObjectActionList) => {
      this.objectActionList = objectActionList;
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

  async openEditObjectAction(objectAction: any): Promise<void> {
    await this.showUpdate.openLg(objectAction);
  }

  async openCreateObjectAction() {
    if (!this.showCreate) {
      console.error("showCreate não foi inicializado corretamente.");
      return;
    }

    await this.showCreate.openLg();
  }


  async deleteObjectAction(objectAction: any) {
    await this.confirmForRemove(objectAction.id);
  }

  async confirmForRemove(id: string): Promise<any> {
    this.sweetAlertService.confirmAlert({
      title: 'Deseja remover esse Objeto de Ação?',
      text: 'Ao remover esse Objeto de Ação, todo o acesso associado a ele serão removidos!',
      icon: AlertIcon.WARNING,
      confirmText: 'O Objeto de Ação foi removido com sucesso!',
      cancellText: 'Os dados do Objeto de Ação não foram modificados!'
    }).then(async (willDelete) => {
      if (willDelete.dismiss) {
        Swal.fire('', 'Os dados do Objeto de Ação não foram modificados!', 'error');
      } else {
        try {
          await this.objectActiionService.deleteObjectAction(id)
          await Swal.fire('', 'O Objeto de Ação foi removida com sucesso!', 'success');
          location.reload();
        } catch (e) {
          Swal.fire('', 'Os dados do Objeto de Ação não foram modificados!', 'error');
          console.error(e);
        }
      }
    });
  }

  async filter(name: any): Promise<void> {
    this.objectActiionService.getSearchObjectActions(100, 0, true, name).subscribe((objectActionList: any) => {
      this.objectActionList = objectActionList;
    });
  }


  cleanFilter(): void {
    this.nameInput.nativeElement.value = '';
    this.ngOnInit()
  }
}

