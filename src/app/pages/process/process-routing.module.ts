import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { ProcessListComponent } from "./process-list/process-list.component";
import { ProcessNewComponent } from "./process-new/process-new.component";
import { ProcessEditComponent } from "./process-edit/process-edit.component";

const routes: Routes = [
    {
      path: '', data: { breadcrumb: 'Pesquisar Processo' },
      component: ProcessListComponent
    },
    {
      path: 'new', data: { breadcrumb: 'Cadastro de Processo' },
      component: ProcessNewComponent
    },
    {
      path: 'edit', data: { breadcrumb: 'Atualizar Processo' }, 
      component: ProcessEditComponent
    },
  
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class ProcessRoutingModule { }