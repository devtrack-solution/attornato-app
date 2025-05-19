import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ToastModule } from 'primeng/toast';
import { PermissionCreateComponent } from './permission-create/permission-create.component';
import { PermissionListComponent } from './permission-list/permission-list.component';
import { PermissionRoutingModule } from './permission-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    PermissionCreateComponent,
    PermissionListComponent,
  ],
  exports: [
    PermissionCreateComponent,
    PermissionListComponent,
  ],
  imports: [
    CommonModule,
    PermissionRoutingModule,
    SharedModule
  ]
})
export class PermissionModule { }
