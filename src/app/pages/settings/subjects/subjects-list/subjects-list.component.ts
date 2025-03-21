import { Component, OnInit, ViewChild } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { SubjectsEditComponent } from '../subjects-edit/subjects-edit.component';
import { SubjectsNewComponent } from '../subjects-new/subjects-new.component';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { PaginatorModule } from 'primeng/paginator';
import { TableModule } from 'primeng/table';
import { SubjectsNamespace } from 'src/app/shared/components/types/subjects.type';
import { SubjectService } from '../service/subjects.service';
import { SweetAlertService, AlertIcon } from 'src/app/shared/service/sweet-alert.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-subjects-list',
  standalone: true,
  imports: [CommonModule, SharedModule, TableModule, SubjectsEditComponent, SubjectsNewComponent,
    PaginatorModule, ButtonModule, DialogModule],
  templateUrl: './subjects-list.component.html',
  styleUrl: './subjects-list.component.scss'
})
export class SubjectsListComponent implements OnInit {

  display: boolean = false
  subjectsList: SubjectsNamespace.SubjectsList | any
  @ViewChild('showUpdate') showUpdate: any;
  @ViewChild('showCreate', { static: false }) showCreate: any;


  constructor(private readonly sweetAlertService: SweetAlertService, private subjectsService: SubjectService) { }

  ngOnInit() {
    this.subjectsService.getSubjects(100, 0, true).subscribe((subjectsList: SubjectsNamespace.SubjectsList) => {
      this.subjectsList = subjectsList;
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

  async openEditSubjects(subject: any): Promise<void> {
    await this.showUpdate.openLg(subject);
  }

  async openCreateSubjects() {
    if (!this.showCreate) {
      console.error("showCreate não foi inicializado corretamente.");
      return;
    }

    await this.showCreate.openLg();
  }


  async deleteSubjects(subject: any) {
    await this.confirmForRemove(subject.id);
  }

  async confirmForRemove(id: string): Promise<any> {
    this.sweetAlertService.confirmAlert({
      title: 'Deseja remover esse Assunto?',
      text: 'Ao remover esse Assunto, todo o acesso associado a ele serão removidos!',
      icon: AlertIcon.WARNING,
      confirmText: 'O Assunto foi removido com sucesso!',
      cancellText: 'Os dados do Assunto não foram modificados!'
    }).then(async (willDelete) => {
      if (willDelete.dismiss) {
        Swal.fire('', 'Os dados do Assunto não foram modificados!', 'error');
      } else {
        try {
          await this.subjectsService.deleteSubject(id)
          await Swal.fire('', 'O Assunto foi removida com sucesso!', 'success');
          location.reload();
        } catch (e) {
          Swal.fire('', 'Os dados do Assunto não foram modificados!', 'error');
          console.error(e);
        }
      }
    });
  }
}
