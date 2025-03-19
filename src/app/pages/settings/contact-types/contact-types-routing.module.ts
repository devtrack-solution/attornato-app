import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { ContactTypesEditComponent } from "./contact-types-edit/contact-types-edit.component";
import { ContactTypesListComponent } from "./contact-types-list/contact-types-list.component";
import { ContactTypesNewComponent } from "./contact-types-new/contact-types-new.component";

const routes: Routes = [
    {
      path: '',
      component: ContactTypesListComponent
    },
    {
      path: 'new',
      component: ContactTypesNewComponent
    },
    {
      path: 'edit',
      component: ContactTypesEditComponent
    },
  
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class ContactTypesRoutingModule { }