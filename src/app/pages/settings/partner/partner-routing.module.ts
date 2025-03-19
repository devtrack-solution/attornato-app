import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { PartnerListComponent } from "./partner-list/partner-list.component";
import { PartnerNewComponent } from "./partner-new/partner-new.component";
import { PartnerEditComponent } from "./partner-edit/partner-edit.component";

const routes: Routes = [
    {
      path: '',
      component: PartnerListComponent
    },
    {
      path: 'new',
      component: PartnerNewComponent
    },
    {
      path: 'edit',
      component: PartnerEditComponent
    },
  
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class PartnerRoutingModule { }