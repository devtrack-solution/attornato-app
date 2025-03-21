import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { CustomerEditComponent } from "./customer-edit/customer-edit.component";
import { CustomerListComponent } from "./customer-list/customer-list.component";
import { CustomerNewComponent } from "./customer-new/customer-new.component";

const routes: Routes = [
    {
      path: '',
      component: CustomerListComponent
    },
    {
      path: 'new',
      component: CustomerNewComponent
    },
    {
      path: 'edit',
      component: CustomerEditComponent
    },
  
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class CustomerRoutingModule { }