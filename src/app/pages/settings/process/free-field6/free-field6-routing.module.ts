import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { FreeField6EditComponent } from "./free-field6-edit/free-field6-edit.component";
import { FreeField6ListComponent } from "./free-field6-list/free-field6-list.component";
import { FreeField6NewComponent } from "./free-field6-new/free-field6-new.component";

const routes: Routes = [
    {
      path: '',
      component: FreeField6ListComponent
    },
    {
      path: 'new',
      component: FreeField6NewComponent
    },
    {
      path: 'edit',
      component: FreeField6EditComponent
    },
  
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class FreeField6RoutingModule { }