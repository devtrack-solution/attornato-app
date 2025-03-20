import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { ProceduralStatusEditComponent } from "./procedural-status-edit/procedural-status-edit.component";
import { ProceduralStatusListComponent } from "./procedural-status-list/procedural-status-list.component";
import { ProceduralStatusNewComponent } from "./procedural-status-new/procedural-status-new.component";

const routes: Routes = [
    {
      path: '',
      component: ProceduralStatusListComponent
    },
    {
      path: 'new',
      component: ProceduralStatusNewComponent
    },
    {
      path: 'edit',
      component: ProceduralStatusEditComponent
    },
  
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class ProceduralStatusRoutingModule { }