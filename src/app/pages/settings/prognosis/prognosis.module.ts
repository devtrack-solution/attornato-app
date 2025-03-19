import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/shared/shared.module";
import { PrognosisRoutingModule } from "./prognosis-routing.module";

@NgModule({
    declarations: [],
    imports: [
      CommonModule,
      PrognosisRoutingModule,
      SharedModule
    ]
  })
  export class PrognosisModule { }