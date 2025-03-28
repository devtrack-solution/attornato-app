import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FieldArrayType } from '@ngx-formly/core';
import { AccordionModule } from 'primeng/accordion';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-formly-repeat-section',
  standalone: false,
  template: `
    <div class="mb-3">
      <h5 *ngIf="props.label" class="mb-3">{{ props.label }}</h5>
      <p *ngIf="props.description">{{ props.description }}</p>

      <p-accordion [multiple]="true" class="mb-3" [style]="{ animation: 'fadeIn .3s ease-in' }">
        <p-accordionTab
          *ngFor="let field of field.fieldGroup; let i = index"
          [header]="getTabHeader(i)"
        >
          <div class="p-grid p-align-center p-mb-3">
            <div class="p-col-12 p-md-1 d-flex align-items-center">
              <button
                pButton
                type="button"
                icon="pi pi-minus"
                class="p-button-danger"
                (click)="remove(i)"
                label="Remover"
                pTooltip="Remover este manual"
              ></button>
            </div>

            <div class="p-col-12 p-md-11">
              <formly-field [field]="field"></formly-field>
            </div>
          </div>
        </p-accordionTab>
      </p-accordion>

      <div class="d-flex justify-content-end">
        <button
          pButton
          type="button"
          icon="pi pi-plus"
          class="p-button-help"
          (click)="add()"
          label="Adicionar Manual"
          pTooltip="Adicionar novo manual"
        ></button>
      </div>
    </div>
  `,
  styles: [`
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to   { opacity: 1; transform: translateY(0); }
    }
  `]
})
export class RepeatTypeComponent extends FieldArrayType {
  // Adiciona ❌ se tiver campos inválidos
  getTabHeader(index: number): string {
    const fg = this.formControl?.get([index]) as any;
    const hasError = fg && fg.invalid && (fg.touched || fg.dirty);
    return `Manual ${index + 1}${hasError ? ' ❌' : ''}`;
  }
}
