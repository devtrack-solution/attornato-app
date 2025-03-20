import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { ResponsibleEditComponent } from "./responsible-edit/responsible-edit.component";
import { ResponsibleListComponent } from "./responsible-list/responsible-list.component";
import { ResponsibleNewComponent } from "./responsible-new/responsible-new.component";

const routes: Routes = [
    {
      path: '',
      component: ResponsibleListComponent
    },
    {
      path: 'new',
      component: ResponsibleNewComponent
    },
    {
      path: 'edit',
      component: ResponsibleEditComponent
    },
  
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class ResponsibleRoutingModule { }