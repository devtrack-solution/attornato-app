import { Component, inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule } from '@angular/forms';
import { NgbModal, ModalDismissReasons, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormlyFormOptions, FormlyFieldConfig, FormlyModule } from '@ngx-formly/core';
import { MessageService } from 'primeng/api';
import { ProcessGroupService } from '../../process-group/service/process-group.serivce';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommonModule } from '@angular/common';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { OriginService } from '../service/origin.service';

@Component({
  selector: 'app-origin-edit',
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
  templateUrl: './origin-edit.component.html',
  styleUrl: './origin-edit.component.scss'
})
export class OriginEditComponent implements OnInit {

  form: FormGroup;
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
  originService = inject(OriginService)

  constructor(
    protected modalService: NgbModal,
    private messageService: MessageService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      name: [''] // Inicialmente vazio
    });
  }

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

  async openLg(origin: any): Promise<void> {
    this.model = origin
    this.form.patchValue({ name: origin.name }); // Preenche o formulário com os dados do processo
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
      await this.originService.ediOrigin(this.model.id, { name: name });
      this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Origem atualizado com sucesso!' });
      setTimeout(() => {
        this.display = false
        location.reload();
      }, 1000);
    } catch (error) {
      console.log('Erro ao salvar Origem', error);
      this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao salvar um Origem!' });
    }
  }

  async voltar(modal: any) {
    modal.close();
    this.isOpened = false;
    location.reload();
  }
}
