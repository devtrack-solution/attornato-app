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
import { FormlyFieldStepper } from './formlys/stepper.type';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RepeatTypeComponent } from './components/types/repeat-section.type';
import { DateMaskTypeComponent } from './components/types/date-mask.type';
import { FormlyPrimeNGModule } from '@ngx-formly/primeng';
import { FormStepperComponent } from './components/form-stepper/form-stepper.component';
import { ButtonModule } from 'primeng/button';
import { AccordionModule } from 'primeng/accordion';
import { TooltipModule } from 'primeng/tooltip';
import { RadioButtonModule } from 'primeng/radiobutton';



@NgModule({
  declarations: [FormlyPrimeInputComponent, FormlyFieldStepper, RepeatTypeComponent, DateMaskTypeComponent, FormStepperComponent],
  imports: [
    CommonModule,
    FormsModule,
    ToastModule,
    FormlyPrimeNGModule,
    TableModule,
    ReactiveFormsModule,
    NgbModule,
    NgbDropdownModule,
    NgbNavModule,
    NgbTooltipModule,
    NgbAccordionModule,
    NgbDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatStepperModule,
    MatIconModule,
    MatButtonModule,
    MatNativeDateModule,
    ButtonModule,
    AccordionModule,
    RadioButtonModule,
    TooltipModule,
    InputTextModule, // Importa o módulo do PrimeNG para inputs
    FormlyModule.forRoot({
      types: [
        {
          name: 'primeng-input',
          component: FormlyPrimeInputComponent, // Criamos esse componente abaixo
          wrappers: ['form-field'], // Aplica automaticamente os estilos de form
        },
        {
          name: 'stepper',
          component: FormlyFieldStepper,
          wrappers: [],
          defaultOptions: {
            props: {
              isHide: false
            }
          }
        },
        { name: 'repeat', component: RepeatTypeComponent },
        { name: 'dateMask', component: DateMaskTypeComponent }
      ],
    }),
  ],
  exports: [
    FormlyModule,
    FormlyPrimeNGModule,
    TableModule,
    ReactiveFormsModule,
    NgbModule,
    NgbDropdownModule,
    NgbNavModule,
    NgbTooltipModule,
    NgbAccordionModule,
    NgbDatepickerModule,
    ToastModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    MatNativeDateModule,
    MatStepperModule,
    FormStepperComponent,
    ButtonModule
  ],
  providers: [MessageService]
})
export class SharedModule { }
