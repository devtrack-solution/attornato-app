import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormlyFieldConfig, FormlyFormOptions, FormlyModule } from '@ngx-formly/core';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { SharedModule } from 'src/app/shared/shared.module';
import { ResponsibleService } from '../service/responsible.service';

@Component({
  selector: 'app-responsible-new',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    FormlyBootstrapModule,
    NgbModule,
    DialogModule,
    ButtonModule,
    FormlyModule
  ],
  templateUrl: './responsible-new.component.html',
  styleUrl: './responsible-new.component.scss'
})
export class ResponsibleNewComponent implements OnInit {

  form = new FormGroup({})
  options: FormlyFormOptions = {}
  model: any = {}
  fields: FormlyFieldConfig[] | any
  message: any;

  closeResult = '';
  first: number = 0
  rows: number = 99999
  accountId: string = ''
  content: any = {};
  isOpened = false;
  tags: any;
  roles: any;
  display: boolean = false
  @ViewChild('modalContent', { static: false }) modalContent!: TemplateRef<any>;
  responsibleService = inject(ResponsibleService)

  constructor(
    protected modalService: NgbModal,
    private readonly router: Router,
    private messageService: MessageService
  ) { }
  async ngOnInit() {
    this.fields = [
      {
        fieldGroupClassName: 'row',
        fieldGroup: [
          //nome
          {
            key: 'name',
            type: 'primeng-input',
            className: 'col-12 col-md-12',
            props: {
              label: 'Nome',
              placeholder: 'Informe o nome',
              required: true,
              attributes: {
                autocomplete: 'off'
              }
            }
          },
        ],
      }
    ]

  }

  async openLg(): Promise<void> {
    //await this.openModalService()
    this.display = true
  }

  async openModalService() {
    if (!this.isOpened) {
      try {

        if (!this.modalContent) {
          console.error("modalContent não está definido!");
          return;
        }

        const modalRef = this.modalService.open(this.modalContent, { size: 'md' });

        if (modalRef.result && typeof modalRef.result.then === 'function') {
          modalRef.result.then(
            (result: any) => {
              this.closeResult = `Closed with: ${result}`;
            },
            (reason: any) => {
              this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            }
          );
        } else {
          console.error("modalRef.result não possui then(), modal possivelmente não foi aberto corretamente.");
        }

        this.isOpened = true;
      } catch (error) {
        console.error("Erro ao abrir modal:", error);
      }
    } else {
      this.isOpened = false;
    }
  }


  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'com tecla ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'com clique fora do modal';
    } else {
      return `com motivo desconhecido: ${reason}`;
    }
  }


  async close() {
    this.display = false
    location.reload();
  }

  async onSubmit(name: any): Promise<void> {
    this.messageService.add({ severity: 'info', summary: 'Informação', detail: 'Dados sendo processados!' });
    try {
      await this.responsibleService.saveResponsible({ name: name });
      this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Responsável cadastrado com sucesso!' });
      setTimeout(() => {
        this.display = false
        location.reload();
      }, 1000);
    } catch (error) {
      console.log('Erro ao salvar Responsável', error);
      this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao salvar um Responsável!' });
    }
  }

  async voltar(modal: any) {
    modal.close();
    this.isOpened = false;
    location.reload();
  }
}
