import { RouterModule, Routes } from "@angular/router";
import { ProcessGroupEditComponent } from "./process-group-edit/process-group-edit.component";
import { ProcessGroupListComponent } from "./process-group-list/process-group-list.component";
import { ProcessGroupNewComponent } from "./process-group-new/process-group-new.component";
import { NgModule } from "@angular/core";

const routes: Routes = [
    {
      path: '',
      component: ProcessGroupListComponent
    },
    {
      path: 'new',
      component: ProcessGroupNewComponent
    },
    {
      path: 'edit',
      component: ProcessGroupEditComponent
    },
  
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class ProcessGroupRoutingModule { }