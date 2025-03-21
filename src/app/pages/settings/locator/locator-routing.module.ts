import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { LocatorEditComponent } from "./locator-edit/locator-edit.component";
import { LocatorListComponent } from "./locator-list/locator-list.component";
import { LocatorNewComponent } from "./locator-new/locator-new.component";

const routes: Routes = [
    {
      path: '',
      component: LocatorListComponent
    },
    {
      path: 'new',
      component: LocatorNewComponent
    },
    {
      path: 'edit',
      component: LocatorEditComponent
    },
  
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class LocatorRoutingModule { }