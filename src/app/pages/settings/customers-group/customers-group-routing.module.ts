import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { CustomersGroupNewComponent } from "./customers-group-new/customers-group-new.component";
import { CustomersGroupEditComponent } from "./customers-group-edit/customers-group-edit.component";
import { CustomersGroupListComponent } from "./customers-group-list/customers-group-list.component";

const routes: Routes = [
    {
      path: '',
      component: CustomersGroupListComponent
    },
    {
      path: 'new',
      component: CustomersGroupNewComponent
    },
    {
      path: 'edit',
      component: CustomersGroupEditComponent
    },
  
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class CustomersGroupRoutingModule { }