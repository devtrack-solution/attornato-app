import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { PrognosisEditComponent } from "./prognosis-edit/prognosis-edit.component";
import { PrognosisListComponent } from "./prognosis-list/prognosis-list.component";
import { PrognosisNewComponent } from "./prognosis-new/prognosis-new.component";

const routes: Routes = [
    {
      path: '',
      component: PrognosisListComponent
    },
    {
      path: 'new',
      component: PrognosisNewComponent
    },
    {
      path: 'edit',
      component: PrognosisEditComponent
    },
  
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class PrognosisRoutingModule { }