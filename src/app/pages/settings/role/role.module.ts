import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { RoleRoutingModule } from './role-routing.module';
import { RoleCreateComponent } from './role-create/role-create.component';
import { RoleListComponent } from './role-list/role-list.component';
import { RoleShowComponent } from './role-show/role-show.component';
import { RoleUpdateComponent } from './role-update/role-update.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    RoleListComponent,
    RoleCreateComponent,
    RoleUpdateComponent,
    RoleShowComponent,
  ],
  imports: [
    CommonModule,
    RoleRoutingModule,
    SharedModule
  ]
})
export class RoleModule { }
