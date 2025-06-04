import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { FreeField1ListComponent } from "./free-field1-list/free-field1-list.component";
import { FreeField1NewComponent } from "./free-field1-new/free-field1-new.component";
import { FreeField1EditComponent } from "./free-field1-edit/free-field1-edit.component";

const routes: Routes = [
    {
      path: '',
      component: FreeField1ListComponent
    },
    {
      path: 'new',
      component: FreeField1NewComponent
    },
    {
      path: 'edit',
      component: FreeField1EditComponent
    },
  
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class FreeField1RoutingModule { }