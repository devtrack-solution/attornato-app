import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { LocalProcedureListComponent } from "./local-procedure-list/local-procedure-list.component";
import { LocalProcedureNewComponent } from "./local-procedure-new/local-procedure-new.component";
import { LocalProcedureEditComponent } from "./local-procedure-edit/local-procedure-edit.component";

const routes: Routes = [
    {
      path: '',
      component: LocalProcedureListComponent
    },
    {
      path: 'new',
      component: LocalProcedureNewComponent
    },
    {
      path: 'edit',
      component: LocalProcedureEditComponent
    },
  
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class LocalProcedureRoutingModule { }