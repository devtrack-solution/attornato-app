import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PermissionCreateComponent } from './permission-create/permission-create.component';
import { PermissionListComponent } from './permission-list/permission-list.component';

const routes: Routes = [
  {
    path: '',
    component: PermissionListComponent
  },
  {
    path: 'new',
    component: PermissionCreateComponent
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PermissionRoutingModule { }
