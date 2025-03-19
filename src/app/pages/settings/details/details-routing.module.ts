import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { DetailsEditComponent } from "./details-edit/details-edit.component";
import { DetailsListComponent } from "./details-list/details-list.component";
import { DetailsNewComponent } from "./details-new/details-new.component";

const routes: Routes = [
    {
      path: '',
      component: DetailsListComponent
    },
    {
      path: 'new',
      component: DetailsNewComponent
    },
    {
      path: 'edit',
      component: DetailsEditComponent
    },
  
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class DetailsRoutingModule { }