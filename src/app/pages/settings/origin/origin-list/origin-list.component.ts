import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { PaginatorModule } from 'primeng/paginator';
import { TableModule } from 'primeng/table';
import { OriginNamespace } from 'src/app/shared/components/types/origin.type';
import { SharedModule } from 'src/app/shared/shared.module';
import { OriginEditComponent } from '../origin-edit/origin-edit.component';
import { OriginNewComponent } from '../origin-new/origin-new.component';
import { AlertIcon, SweetAlertService } from 'src/app/shared/service/sweet-alert.service';
import { OriginService } from '../service/origin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-origin-list',
  standalone: true,
  imports: [CommonModule, SharedModule, TableModule, OriginEditComponent, OriginNewComponent,
    PaginatorModule, ButtonModule, DialogModule],
  templateUrl: './origin-list.component.html',
  styleUrl: './origin-list.component.scss'
})
export class OriginListComponent implements OnInit {

  display: boolean = false
  originList: OriginNamespace.OriginList | any
  @ViewChild('showUpdate') showUpdate: any;
  @ViewChild('showCreate', { static: false }) showCreate: any;
  @ViewChild('name') nameInput!: ElementRef;


  constructor(private readonly sweetAlertService: SweetAlertService, private orginService: OriginService) { }

  ngOnInit() {
    this.orginService.getOrigins(100, 0, true).subscribe((originList: OriginNamespace.OriginList) => {
      this.originList = originList;
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

  async openEditOrigin(process: any): Promise<void> {
    await this.showUpdate.openLg(process);
  }

  async openCreateOrigin() {
    if (!this.showCreate) {
      console.error("showCreate não foi inicializado corretamente.");
      return;
    }

    await this.showCreate.openLg();
  }


  async deleteOrigin(process: any) {
    await this.confirmForRemove(process.id);
  }

  async confirmForRemove(id: string): Promise<any> {
    this.sweetAlertService.confirmAlert({
      title: 'Deseja remover essa Origem?',
      text: 'Ao remover essa Origem, todo o acesso associado a ele serão removidos!',
      icon: AlertIcon.WARNING,
      confirmText: 'A Origem foi removido com sucesso!',
      cancellText: 'Os dados da Origem não foram modificados!'
    }).then(async (willDelete) => {
      if (willDelete.dismiss) {
        Swal.fire('', 'Os dados da Origem não foram modificados!', 'error');
      } else {
        try {
          await this.orginService.deleteOrigin(id)
          await Swal.fire('', 'A Origem foi removida com sucesso!', 'success');
          location.reload();
        } catch (e) {
          Swal.fire('', 'Os dados da Origem não foram modificados!', 'error');
          console.error(e);
        }
      }
    });
  }

  async filter(name: any): Promise<void> {
    this.orginService.getSearchOrigins(100, 0, true, name).subscribe((originList: any) => {
      this.originList = originList;
    });
  }


  cleanFilter(): void {
    this.nameInput.nativeElement.value = '';
    this.ngOnInit()
  }
}
