import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'process-group', data: { breadcrumb: 'Grupo de Processos' },
    loadChildren: () => import('./process-group/process-group.module').then((module) => module.ProcessGroupModule),
  },
  {
    path: 'customers-group', data: { breadcrumb: 'Grupo de Clientes' },
    loadChildren: () => import('./customers-group/customers-group.module').then((module) => module.CustomersGroupModule),
  },
  {
    path: 'local-procedure', data: { breadcrumb: 'Local de Trâmite' },
    loadChildren: () => import('./local-procedure/local-procedure.module').then((module) => module.LocalProcedureModule),
  },
  {
    path: 'roles', data: { breadcrumb: 'Perfil' },
    loadChildren: () => import('./roles/roles.module').then((module) => module.RolesModule),
  },
  {
    path: 'contact-types', data: { breadcrumb: 'Tipos de Contato' },
    loadChildren: () => import('./contact-types/contact-types.module').then((module) => module.ContactTypesModule),
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }