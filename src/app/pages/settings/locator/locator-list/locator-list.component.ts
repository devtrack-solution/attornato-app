import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { LocatorEditComponent } from '../locator-edit/locator-edit.component';
import { LocatorNewComponent } from '../locator-new/locator-new.component';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { PaginatorModule } from 'primeng/paginator';
import { TableModule } from 'primeng/table';
import { LocatorNamespace } from 'src/app/shared/components/types/locator.type';
import { LocatorService } from '../service/locator.service';
import { SweetAlertService, AlertIcon } from 'src/app/shared/service/sweet-alert.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-locator-list',
  standalone: true,
  imports: [CommonModule, SharedModule, TableModule, LocatorEditComponent, LocatorNewComponent,
    PaginatorModule, ButtonModule, DialogModule],
  templateUrl: './locator-list.component.html',
  styleUrl: './locator-list.component.scss'
})
export class LocatorListComponent implements OnInit {

  display: boolean = false
  locatorList: LocatorNamespace.LocatorList | any
  @ViewChild('showUpdate') showUpdate: any;
  @ViewChild('showCreate', { static: false }) showCreate: any;
  @ViewChild('name') nameInput!: ElementRef;


  constructor(private readonly sweetAlertService: SweetAlertService, private locatorService: LocatorService) { }

  ngOnInit() {
    this.locatorService.getLocators(100, 0, true).subscribe((locatorList: LocatorNamespace.LocatorList) => {
      this.locatorList = locatorList;
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

  async openEditLocator(locator: any): Promise<void> {
    await this.showUpdate.openLg(locator);
  }

  async openCreateLocator() {
    if (!this.showCreate) {
      console.error("showCreate não foi inicializado corretamente.");
      return;
    }

    await this.showCreate.openLg();
  }


  async deleteLocator(locator: any) {
    await this.confirmForRemove(locator.id);
  }

  async confirmForRemove(id: string): Promise<any> {
    this.sweetAlertService.confirmAlert({
      title: 'Deseja remover esse Localizador?',
      text: 'Ao remover esse Localizador, todo o acesso associado a ele serão removidos!',
      icon: AlertIcon.WARNING,
      confirmText: 'O Localizador foi removido com sucesso!',
      cancellText: 'Os dados do Localizador não foram modificados!'
    }).then(async (willDelete) => {
      if (willDelete.dismiss) {
        Swal.fire('', 'Os dados do Localizador não foram modificados!', 'error');
      } else {
        try {
          await this.locatorService.deleteLocator(id)
          await Swal.fire('', 'O Localizador foi removida com sucesso!', 'success');
          location.reload();
        } catch (e) {
          Swal.fire('', 'Os dados do Localizador não foram modificados!', 'error');
          console.error(e);
        }
      }
    });
  }

  async filter(name: any): Promise<void> {
    this.locatorService.getSearchLocators(100, 0, true, name).subscribe((locatorList: any) => {
      this.locatorList = locatorList;
    });
  }


  cleanFilter(): void {
    this.nameInput.nativeElement.value = '';
    this.ngOnInit()
  }
}
