import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { OnboardingRoutingModule } from "./onboarding-routing.module";
import { SharedModule } from "src/app/shared/shared.module";
import { ToastModule } from "primeng/toast";

@NgModule({
    declarations: [],
    imports: [
      CommonModule,
      OnboardingRoutingModule,
      SharedModule,
      ToastModule
    ]
  })
  export class OnboardingModule { }