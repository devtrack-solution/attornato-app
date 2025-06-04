import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'free-field1', data: { breadcrumb: 'Campo Livre 1' },
    loadChildren: () => import('./free-field1/free-field1.module').then((module) => module.FreeField1Module),
  },
  {
    path: 'free-field2', data: { breadcrumb: 'Campo Livre 2' },
    loadChildren: () => import('./free-field2/free-field2.module').then((module) => module.FreeField2Module),
  },
  {
    path: 'free-field6', data: { breadcrumb: 'Campo Livre 6' },
    loadChildren: () => import('./free-field6/free-field6.module').then((module) => module.FreeField6Module),
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProcessSettingsRoutingModule { }