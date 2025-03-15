import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormlyModule } from '@ngx-formly/core';
import { TableModule } from 'primeng/table';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ToastModule,
    FormlyBootstrapModule,
    TableModule,
    ReactiveFormsModule
  ],
  exports: [
    FormlyModule,
    FormlyBootstrapModule,
    TableModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
