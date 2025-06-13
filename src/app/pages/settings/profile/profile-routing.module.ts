import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { ProfileEditComponent } from "./profile-edit/profile-edit.component";
import { ProfileListComponent } from "./profile-list/profile-list.component";
import { ProfileNewComponent } from "./profile-new/profile-new.component";

const routes: Routes = [
    {
      path: '',
      component: ProfileListComponent
    },
    {
      path: 'new',
      component: ProfileNewComponent
    },
    {
      path: 'edit',
      component: ProfileEditComponent
    },
  
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class ProfileRoutingModule { }