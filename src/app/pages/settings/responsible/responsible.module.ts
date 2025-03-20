import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/shared/shared.module";
import { ResponsibleRoutingModule } from "./responsible-routing.module";

@NgModule({
    declarations: [],
    imports: [
      CommonModule,
      ResponsibleRoutingModule,
      SharedModule
    ]
  })
  export class ResponsibleModule { }