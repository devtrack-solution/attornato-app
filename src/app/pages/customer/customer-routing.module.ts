import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { CustomerEditComponent } from "./customer-edit/customer-edit.component";
import { CustomerListComponent } from "./customer-list/customer-list.component";
import { CustomerNewComponent } from "./customer-new/customer-new.component";

const routes: Routes = [
    {
      path: '', data: { breadcrumb: 'Pesquisar Cliente' },
      component: CustomerListComponent
    },
    {
      path: 'new', data: { breadcrumb: 'Cadastro de Cliente' },
      component: CustomerNewComponent
    },
    {
      path: 'edit', data: { breadcrumb: 'Atualizar Cliente' }, 
      component: CustomerEditComponent
    },
  
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class CustomerRoutingModule { }