import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { OnboardingComponent } from "./onboarding.component";

const routes: Routes = [
    {
      path: '',
      component: OnboardingComponent
    },
  
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class OnboardingRoutingModule { }