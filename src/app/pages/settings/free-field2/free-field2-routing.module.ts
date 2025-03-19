import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { FreeField2EditComponent } from "./free-field2-edit/free-field2-edit.component";
import { FreeField2ListComponent } from "./free-field2-list/free-field2-list.component";
import { FreeField2NewComponent } from "./free-field2-new/free-field2-new.component";

const routes: Routes = [
    {
      path: '',
      component: FreeField2ListComponent
    },
    {
      path: 'new',
      component: FreeField2NewComponent
    },
    {
      path: 'edit',
      component: FreeField2EditComponent
    },
  
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class FreeField2RoutingModule { }