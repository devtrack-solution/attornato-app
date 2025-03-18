import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { RolesEditComponent } from "./roles-edit/roles-edit.component";
import { RolesListComponent } from "./roles-list/roles-list.component";
import { RolesNewComponent } from "./roles-new/roles-new.component";

const routes: Routes = [
    {
      path: '',
      component: RolesListComponent
    },
    {
      path: 'new',
      component: RolesNewComponent
    },
    {
      path: 'edit',
      component: RolesEditComponent
    },
  
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class RolesRoutingModule { }