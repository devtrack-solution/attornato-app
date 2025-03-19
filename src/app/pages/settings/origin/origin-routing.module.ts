import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { OriginListComponent } from "./origin-list/origin-list.component";
import { OriginNewComponent } from "./origin-new/origin-new.component";
import { OriginEditComponent } from "./origin-edit/origin-edit.component";

const routes: Routes = [
    {
      path: '',
      component: OriginListComponent
    },
    {
      path: 'new',
      component: OriginNewComponent
    },
    {
      path: 'edit',
      component: OriginEditComponent
    },
  
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class OriginRoutingModule { }