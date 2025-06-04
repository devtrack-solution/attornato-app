import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/shared/shared.module";
import { ProcessSettingsRoutingModule } from "./process-routing.module";

@NgModule({
    declarations: [
    ],
    imports: [
      CommonModule,
      ProcessSettingsRoutingModule,
      SharedModule
    ]
  })
  export class ProcessSettingsModule { }