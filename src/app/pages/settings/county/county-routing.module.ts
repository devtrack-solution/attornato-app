import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { CountyEditComponent } from "./county-edit/county-edit.component";
import { CountyListComponent } from "./county-list/county-list.component";
import { CountyNewComponent } from "./county-new/county-new.component";

const routes: Routes = [
    {
      path: '',
      component: CountyListComponent
    },
    {
      path: 'new',
      component: CountyNewComponent
    },
    {
      path: 'edit',
      component: CountyEditComponent
    },
  
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class CountyRoutingModule { }