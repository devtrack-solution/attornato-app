import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule } from 'primeng/paginator';
import { TableModule } from 'primeng/table';
import { CustomerService } from 'src/app/shared/service/customer.service';
import { SweetAlertService, AlertIcon } from 'src/app/shared/service/sweet-alert.service';
import { SharedModule } from 'src/app/shared/shared.module';
import Swal from 'sweetalert2';
import { AccountService } from '../service/account.service';

@Component({
  selector: 'app-account-list',
  standalone: true,
  imports: [CommonModule, SharedModule, TableModule,
    PaginatorModule, ButtonModule, RouterLink],
  templateUrl: './account-list.component.html',
  styleUrl: './account-list.component.scss'
})
export class AccountListComponent implements OnInit {
  
  display: boolean = false
  accountList: any
  @ViewChild('showUpdate') showUpdate: any;
  @ViewChild('showCreate', { static: false }) showCreate: any;
  private router = inject(Router);
  typeFilter: any = 'customers';
  tipoPessoa: 'fisica' | 'juridica' = 'fisica';


  constructor(private readonly sweetAlertService: SweetAlertService, private accountService : AccountService) { }

  ngOnInit() {
    this.accountService.getAccounts(99999, 0, true).subscribe((accountList: any) => {
      this.accountList = accountList;
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


  async deleteAccount(account: any) {
    await this.confirmForRemove(account.id);
  }

  async confirmForRemove(id: string): Promise<any> {
    this.sweetAlertService.confirmAlert({
      title: 'Deseja remover essa Conta?',
      text: 'Ao remover essa Conta, todo o acesso associado a ele serão removidos!',
      icon: AlertIcon.WARNING,
      confirmText: 'A Conta foi removido com sucesso!',
      cancellText: 'Os dados da Conta não foram modificados!'
    }).then(async (willDelete) => {
      if (willDelete.dismiss) {
        Swal.fire('', 'Os dados da Conta não foram modificados!', 'error');
      } else {
        try {
          await this.accountService.deleteAccount(id)
          await Swal.fire('', 'A Conta foi removida com sucesso!', 'success');
          location.reload();
        } catch (e) {
          Swal.fire('', 'Os dados da Conta não foram modificados!', 'error');
          console.error(e);
        }
      }
    });
  }

  async editar(account: any) {
    this.accountService.setAccount(account)
    this.router.navigate(['/admin/account/edit']);
  }
}
