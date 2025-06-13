import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { CountyEditComponent } from '../county-edit/county-edit.component';
import { CountyNewComponent } from '../county-new/county-new.component';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { PaginatorModule } from 'primeng/paginator';
import { TableModule } from 'primeng/table';
import { CountysService } from '../service/county.service';
import { CountyNamespace } from 'src/app/shared/components/types/county.type';
import { SweetAlertService, AlertIcon } from 'src/app/shared/service/sweet-alert.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-county-list',
  standalone: true,
  imports: [CommonModule, SharedModule, TableModule, CountyEditComponent, CountyNewComponent,
    PaginatorModule, ButtonModule, DialogModule],
  templateUrl: './county-list.component.html',
  styleUrl: './county-list.component.scss'
})
export class CountyListComponent implements OnInit {

  display: boolean = false
  countyList: CountyNamespace.CountyList | any
  @ViewChild('showUpdate') showUpdate: any;
  @ViewChild('showCreate', { static: false }) showCreate: any;
  @ViewChild('name') nameInput!: ElementRef;


  constructor(private readonly sweetAlertService: SweetAlertService, private countyService: CountysService) { }

  ngOnInit() {
    this.countyService.getCountys(100, 0, true).subscribe((countyList: CountyNamespace.CountyList) => {
      this.countyList = countyList;
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

  async openEditCounty(county: any): Promise<void> {
    await this.showUpdate.openLg(county);
  }

  async openCreateCounty() {
    if (!this.showCreate) {
      console.error("showCreate não foi inicializado corretamente.");
      return;
    }

    await this.showCreate.openLg();
  }


  async deleteCounty(county: any) {
    await this.confirmForRemove(county.id);
  }

  async confirmForRemove(id: string): Promise<any> {
    this.sweetAlertService.confirmAlert({
      title: 'Deseja remover essa Comarca?',
      text: 'Ao remover essa Comarca, todo o acesso associado a ele serão removidos!',
      icon: AlertIcon.WARNING,
      confirmText: 'A Comarca foi removido com sucesso!',
      cancellText: 'Os dados da Comarca não foram modificados!'
    }).then(async (willDelete) => {
      if (willDelete.dismiss) {
        Swal.fire('', 'Os dados da Comarca não foram modificados!', 'error');
      } else {
        try {
          await this.countyService.deleteCounty(id)
          await Swal.fire('', 'A Comarca foi removida com sucesso!', 'success');
          location.reload();
        } catch (e) {
          Swal.fire('', 'Os dados da Comarca não foram modificados!', 'error');
          console.error(e);
        }
      }
    });
  }

  async filter(name: any): Promise<void> {
    this.countyService.getSearchCountys(100, 0, true, name).subscribe((countyList: any) => {
      this.countyList = countyList;
    });
  }


  cleanFilter(): void {
    this.nameInput.nativeElement.value = '';
    this.ngOnInit()
  }
}
