import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { PaginatorModule } from 'primeng/paginator';
import { TableModule } from 'primeng/table';
import { SharedModule } from 'src/app/shared/shared.module';
import { SweetAlertService, AlertIcon } from 'src/app/shared/service/sweet-alert.service';
import Swal from 'sweetalert2';
import { CustomerService } from '../service/customer.service';
import { Router } from '@angular/router';
import { RadioButtonModule } from 'primeng/radiobutton';

@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [CommonModule, SharedModule, TableModule,
    PaginatorModule, ButtonModule, DialogModule, RadioButtonModule],
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.scss'
})
export class CustomerListComponent implements OnInit {

  display: boolean = false
  customersLegalList: any
  customersIndividualList: any
  @ViewChild('showUpdate') showUpdate: any;
  @ViewChild('showCreate', { static: false }) showCreate: any;
  private router = inject(Router);
  typeFilter: any = 'customers';
  tipoPessoa: 'fisica' | 'juridica' = 'fisica';


  constructor(private readonly sweetAlertService: SweetAlertService, private customerService: CustomerService) { }

  ngOnInit() {
    this.customerService.getCustomers(100, 0, true, 'legal').subscribe((customersLegalList: any) => {
      this.customersLegalList = customersLegalList;
    });

    this.customerService.getCustomers(100, 0, true, 'individual').subscribe((customersIndividualList: any) => {
      this.customersIndividualList = customersIndividualList;
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

  async openEditCustomers(details: any): Promise<void> {
    await this.showUpdate.openLg(details);
  }

  async openCreateCustomers() {
    if (!this.showCreate) {
      console.error("showCreate não foi inicializado corretamente.");
      return;
    }

    await this.showCreate.openLg();
  }


  async deleteCustomers(customer: any) {
    await this.confirmForRemove(customer.id);
  }

  async searchCustomers(name: any) {
    console.log('olha o nome', name)
  }

  async confirmForRemove(id: string): Promise<any> {
    this.sweetAlertService.confirmAlert({
      title: 'Deseja remover esse Cliente?',
      text: 'Ao remover esse Cliente, todo o acesso associado a ele serão removidos!',
      icon: AlertIcon.WARNING,
      confirmText: 'O Cliente foi removido com sucesso!',
      cancellText: 'Os dados da Cliente não foram modificados!'
    }).then(async (willDelete) => {
      if (willDelete.dismiss) {
        Swal.fire('', 'Os dados do Cliente não foram modificados!', 'error');
      } else {
        try {
          await this.customerService.deleteCustomer(id)
          await Swal.fire('', 'O Cliente foi removida com sucesso!', 'success');
          location.reload();
        } catch (e) {
          Swal.fire('', 'Os dados do Cliente não foram modificados!', 'error');
          console.error(e);
        }
      }
    });
  }

  async editar() {
    this.router.navigate(['/admin/customer/edit']);
  }
}
