import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { PracticeAreaEditComponent } from "./practice-area-edit/practice-area-edit.component";
import { PracticeAreaListComponent } from "./practice-area-list/practice-area-list.component";
import { PracticeAreaNewComponent } from "./practice-area-new/practice-area-new.component";

const routes: Routes = [
    {
      path: '',
      component: PracticeAreaListComponent
    },
    {
      path: 'new',
      component: PracticeAreaNewComponent
    },
    {
      path: 'edit',
      component: PracticeAreaEditComponent
    },
  
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class PracticeAreaRoutingModule { }