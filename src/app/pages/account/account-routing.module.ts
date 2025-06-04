import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { AccountListComponent } from "./account-list/account-list.component";
import { AccountNewComponent } from "./account-new/account-new.component";
import { AccountEditComponent } from "./account-edit/account-edit.component";

const routes: Routes = [
    {
      path: '', data: { breadcrumb: 'Lista de Contas' },
      component: AccountListComponent
    },
    {
      path: 'new', data: { breadcrumb: 'Cadastro de Contas' },
      component: AccountNewComponent
    },
    {
      path: 'edit', data: { breadcrumb: 'Atualizar de Contas' }, 
      component: AccountEditComponent
    },
  
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class AccountRoutingModule { }