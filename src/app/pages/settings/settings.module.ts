import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ProcessGroupModule } from "./process-group/process-group.module";
import { SharedModule } from "src/app/shared/shared.module";
import { SettingsRoutingModule } from "./settings-routing.module";

@NgModule({
    declarations: [
    ],
    imports: [
      CommonModule,
      ProcessGroupModule,
      SettingsRoutingModule,
      SharedModule
    ]
  })
  export class SettingModule { }