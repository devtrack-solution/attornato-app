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
  customersList: any
  @ViewChild('showUpdate') showUpdate: any;
  @ViewChild('showCreate', { static: false }) showCreate: any;
  private router = inject(Router);
  typeFilter: any = 'customers';


  constructor(private readonly sweetAlertService: SweetAlertService, private customerService: CustomerService) { }

  ngOnInit() {
    // this.customerService.getCustomers(100, 0, true).subscribe((customersList: any) => {
    //  this.customersList = customersList;
    //  });
    this.customersList = [{
      "groupCustomers": "Grupo Cliente 01",
      "responsible": "Maria Silva",
      "profile": "1",
      "companyName": "Empresa Exemplo LTDA",
      "tradeName": "Exemplo Comércio",
      "businessArea": "Tecnologia da Informação",
      "cnpj": "12.345.678/0001-90",
      "stateRegistration": "123456789",
      "municipalRegistration": "987654321",
      "address": {
        "zipCode": "12345-678",
        "address": "Rua das Flores, 123",
        "neighborhood": "Centro",
        "city": "São Paulo",
        "state": "SP",
        "contact": [
          {
            "contactType": "1",
            "contact": "(11) 98765-4321"
          },
          {
            "contactType": "1",
            "contact": "(11) 91234-5678"
          }
        ]
      },
      "contactOther": {
        "freeField2": "Campo 01",
        "freefield": "Descrição livre do contato",
        "contact": [
          {
            "contactType": "Telefone",
            "contact": "(11) 3344-5566"
          },
          {
            "contactType": "Telefone",
            "contact": "(11) 99887-7766"
          }
        ]
      }
    }];
    console.log('json', this.customersList)
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
