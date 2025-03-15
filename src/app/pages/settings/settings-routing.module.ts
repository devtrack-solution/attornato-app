import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: 'process-group', data: { breadcrumb: 'Grupo de Processos' },
        loadChildren: () => import('./process-group/process-group.module').then((module) => module.ProcessGroupModule),
      },
  
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class SettingsRoutingModule { }