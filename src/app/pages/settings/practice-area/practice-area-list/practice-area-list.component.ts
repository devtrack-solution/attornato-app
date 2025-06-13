import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { PaginatorModule } from 'primeng/paginator';
import { TableModule } from 'primeng/table';
import { SharedModule } from 'src/app/shared/shared.module';
import { PracticeAreaEditComponent } from '../practice-area-edit/practice-area-edit.component';
import { PracticeAreaNewComponent } from '../practice-area-new/practice-area-new.component';
import { PracticeAreaNamespace } from 'src/app/shared/components/types/practice-area.type';
import { Router } from '@angular/router';
import { SweetAlertService, AlertIcon } from 'src/app/shared/service/sweet-alert.service';
import Swal from 'sweetalert2';
import { PracticeAreaService } from '../service/practice-area.service';

@Component({
  selector: 'app-practice-area-list',
  standalone: true,
  imports: [CommonModule, SharedModule, TableModule, PracticeAreaEditComponent, PracticeAreaNewComponent,
    PaginatorModule, ButtonModule, DialogModule],
  templateUrl: './practice-area-list.component.html',
  styleUrl: './practice-area-list.component.scss'
})
export class PracticeAreaListComponent implements OnInit {

  display: boolean = false
  practiceAreaList: PracticeAreaNamespace.PracticeAreaList | any
  @ViewChild('showUpdate') showUpdate: any;
  @ViewChild('showCreate', { static: false }) showCreate: any;
  @ViewChild('name') nameInput!: ElementRef;

  constructor(private readonly sweetAlertService: SweetAlertService, private practiceAreaService: PracticeAreaService) { }

  ngOnInit() {
    this.practiceAreaService.getPracticeAreas(100, 0, true).subscribe((practiceAreaList: PracticeAreaNamespace.PracticeAreaList) => {
      this.practiceAreaList = practiceAreaList;
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

  async openEditPracticeArea(practiceArea: any): Promise<void> {
    await this.showUpdate.openLg(practiceArea);
  }

  async openCreatePracticeArea() {
    if (!this.showCreate) {
      console.error("showCreate não foi inicializado corretamente.");
      return;
    }

    await this.showCreate.openLg();
  }


  async deletePracticeArea(practiceArea: any) {
    await this.confirmForRemove(practiceArea.id);
  }

  async confirmForRemove(id: string): Promise<any> {
    this.sweetAlertService.confirmAlert({
      title: 'Deseja remover essa Área de Atuação?',
      text: 'Ao remover essa Área de Atuação, todo o acesso associado a ele serão removidos!',
      icon: AlertIcon.WARNING,
      confirmText: 'A Área de Atuação foi removido com sucesso!',
      cancellText: 'Os dados da Área de Atuação não foram modificados!'
    }).then(async (willDelete) => {
      if (willDelete.dismiss) {
        Swal.fire('', 'Os dados da Área de Atuação não foram modificados!', 'error');
      } else {
        try {
          await this.practiceAreaService.deletePracticeArea(id)
          await Swal.fire('', 'A Área de Atuação foi removida com sucesso!', 'success');
          location.reload();
        } catch (e) {
          Swal.fire('', 'Os dados da Área de Atuação não foram modificados!', 'error');
          console.error(e);
        }
      }
    });
  }

  async filter(name: any): Promise<void> {
    this.practiceAreaService.getSearchPracticeAreas(100, 0, true, name).subscribe((practiceAreaList: any) => {
      this.practiceAreaList = practiceAreaList;
    });
  }


  cleanFilter(): void {
    this.nameInput.nativeElement.value = '';
    this.ngOnInit()
  }
}
