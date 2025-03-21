import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { ModalDismissReasons, NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormlyFieldConfig, FormlyFormOptions, FormlyModule } from '@ngx-formly/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { SharedModule } from 'src/app/shared/shared.module';
import { LocatorService } from '../service/locator.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-locator-edit',
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
  templateUrl: './locator-edit.component.html',
  styleUrl: './locator-edit.component.scss'
})
export class LocatorEditComponent implements OnInit {

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
  locatorService = inject(LocatorService)

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

  async openLg(locator: any): Promise<void> {
    this.model = locator
    this.form.patchValue({ name: locator.name }); // Preenche o formulário com os dados do processo
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
      await this.locatorService.ediLocator(this.model.id, { name: name });
      this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Localizador atualizado com sucesso!' });
      setTimeout(() => {
        this.display = false
        location.reload();
      }, 1000);
    } catch (error) {
      console.log('Erro ao salvar Localizador', error);
      this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao salvar um Localizador!' });
    }
  }

  async voltar(modal: any) {
    modal.close();
    this.isOpened = false;
    location.reload();
  }
}
