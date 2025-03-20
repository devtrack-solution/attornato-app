import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { ObjectActionEditComponent } from "./object-action-edit/object-action-edit.component";
import { ObjectActionListComponent } from "./object-action-list/object-action-list.component";
import { ObjectActionNewComponent } from "./object-action-new/object-action-new.component";

const routes: Routes = [
    {
      path: '',
      component: ObjectActionListComponent
    },
    {
      path: 'new',
      component: ObjectActionNewComponent
    },
    {
      path: 'edit',
      component: ObjectActionEditComponent
    },
  
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class ObjectActionRoutingModule { }