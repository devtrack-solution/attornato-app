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
  },
  {
    path: 'prognosis', data: { breadcrumb: 'Prognóstico' },
    loadChildren: () => import('./prognosis/prognosis.module').then((module) => module.PrognosisModule),
  },
  {
    path: 'origin', data: { breadcrumb: 'Origem' },
    loadChildren: () => import('./origin/origin.module').then((module) => module.OriginModule),
  },
  {
    path: 'partner', data: { breadcrumb: 'Parceiro' },
    loadChildren: () => import('./partner/partner.module').then((module) => module.PartnerModule),
  },
  {
    path: 'details', data: { breadcrumb: 'Detalhes' },
    loadChildren: () => import('./details/details.module').then((module) => module.DetailsModule),
  },
  {
    path: 'free-field2', data: { breadcrumb: 'Campo Livre 2' },
    loadChildren: () => import('./free-field2/free-field2.module').then((module) => module.FreeField2Module),
  },
  {
    path: 'procedural-status', data: { breadcrumb: 'Status Processual' },
    loadChildren: () => import('./procedural-status/procedural-status.module').then((module) => module.ProceduralStatusModule),
  },
  {
    path: 'responsible', data: { breadcrumb: 'Responsável' },
    loadChildren: () => import('./responsible/responsible.module').then((module) => module.ResponsibleModule),
  },
  {
    path: 'practice-area', data: { breadcrumb: 'Área da Atuação' },
    loadChildren: () => import('./practice-area/practice-area.module').then((module) => module.PracticeAreaModule),
  },
  {
    path: 'county', data: { breadcrumb: 'Comarca' },
    loadChildren: () => import('./county/county.module').then((module) => module.CountyModule),
  },
  {
    path: 'phase', data: { breadcrumb: 'Fase' },
    loadChildren: () => import('./phase/phase.module').then((module) => module.PhaseModule),
  },
  {
    path: 'object-action', data: { breadcrumb: 'Objeto de Ação' },
    loadChildren: () => import('./object-action/object-action.module').then((module) => module.ObjectActionModule),
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }