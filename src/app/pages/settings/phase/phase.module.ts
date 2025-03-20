import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/shared/shared.module";
import { PhaseRoutingModule } from "./phase-routing.module";

@NgModule({
    declarations: [
    ],
    imports: [
      CommonModule,
      PhaseRoutingModule,
      SharedModule
    ]
  })
  export class PhaseModule { }