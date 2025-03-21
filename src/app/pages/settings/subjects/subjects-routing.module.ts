import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { SubjectsEditComponent } from "./subjects-edit/subjects-edit.component";
import { SubjectsListComponent } from "./subjects-list/subjects-list.component";
import { SubjectsNewComponent } from "./subjects-new/subjects-new.component";

const routes: Routes = [
    {
      path: '',
      component: SubjectsListComponent
    },
    {
      path: 'new',
      component: SubjectsNewComponent
    },
    {
      path: 'edit',
      component: SubjectsEditComponent
    },
  
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class SubjectsRoutingModule { }