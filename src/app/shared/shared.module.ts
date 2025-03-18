import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormlyModule } from '@ngx-formly/core';
import { TableModule } from 'primeng/table';
import { NgbAccordionModule, NgbDatepickerModule, NgbDropdownModule, NgbModule, NgbNavModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { InputTextModule } from 'primeng/inputtext';
import { FormlyPrimeInputComponent } from './components/types/primeng-input.types';
import { MessageService } from 'primeng/api';



@NgModule({
  declarations: [FormlyPrimeInputComponent],
  imports: [
    CommonModule,
    FormsModule,
    ToastModule,
    FormlyBootstrapModule,
    TableModule,
    ReactiveFormsModule,
    NgbModule,
    NgbDropdownModule,
    NgbNavModule,
    NgbTooltipModule,
    NgbAccordionModule,
    NgbDatepickerModule,
    InputTextModule, // Importa o módulo do PrimeNG para inputs
    FormlyModule.forRoot({
      types: [
        {
          name: 'primeng-input',
          component: FormlyPrimeInputComponent, // Criamos esse componente abaixo
          wrappers: ['form-field'], // Aplica automaticamente os estilos de form
        },
      ],
    }),
  ],
  exports: [
    FormlyModule,
    FormlyBootstrapModule,
    TableModule,
    ReactiveFormsModule,
    NgbModule,
    NgbDropdownModule,
    NgbNavModule,
    NgbTooltipModule,
    NgbAccordionModule,
    NgbDatepickerModule,
    ToastModule
  ],
  providers: [MessageService]
})
export class SharedModule { }
