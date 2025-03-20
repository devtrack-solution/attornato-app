import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { PhaseEditComponent } from "./phase-edit/phase-edit.component";
import { PhaseListComponent } from "./phase-list/phase-list.component";
import { PhaseNewComponent } from "./phase-new/phase-new.component";
const routes: Routes = [
    {
      path: '',
      component: PhaseListComponent
    },
    {
      path: 'new',
      component: PhaseNewComponent
    },
    {
      path: 'edit',
      component: PhaseEditComponent
    },
  
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class PhaseRoutingModule { }