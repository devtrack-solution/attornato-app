import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-process-group-new',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    FormlyBootstrapModule,

  ],
  templateUrl: './process-group-new.component.html',
  styleUrl: './process-group-new.component.scss'
})
export class ProcessGroupNewComponent implements OnInit {

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
  @ViewChild('modalContent') modalContent: any;

  constructor(
    protected modalService: NgbModal,
    private readonly router: Router,
  ) { }
  async ngOnInit() {
    this.fields = [
      {
        fieldGroupClassName: 'row',
        fieldGroup: [
          //nome
          {
            key: 'name',
            type: 'input',
            className: 'col-12 col-md-6',
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
    await this.openModalService()
  }

  async openModalService() {
    if (!this.isOpened) {
      this.modalService.open(this.modalContent, { size: 'md' }).result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
      this.isOpened = true;
    } else {
      this.isOpened = false
    }
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      this.isOpened = false;
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      this.isOpened = false;
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }


  async close(modal: any) {
    modal.close();
    this.isOpened = false;
  }

  async onSubmit(modal: any): Promise<void> {
    //await API.post(`roles`, this.model);
    modal.close();
    this.isOpened = false;
    location.reload();
  }

  async voltar(modal: any) {
    modal.close();
    this.isOpened = false;
    location.reload();
  }
}
